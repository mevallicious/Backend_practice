import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,type GraphNode, StateGraph, START, END, ReducedValue } from "@langchain/langgraph";
import {createAgent , providerStrategy} from "langchain"
import {mistralModel , geminiModel ,cohereModel} from "./models.service.js"
import * as z from "zod"


const State = new StateSchema({
    messages:MessagesValue,
    solution_1:new ReducedValue(z.string().default(""),{
        reducer : (current,next)=>{
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => next
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score:0,
        solution_2_score:0,
    }),
        {
            reducer:(current,next)=>{
                return next
            }
        }
)
})

const solutionNode: GraphNode<typeof State> = async (state:typeof State)=>{

    console.log(state)

    const [mistral_solution,cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].content),
        cohereModel.invoke(state.messages[0].content)
    ])

    return{
        solution_1:mistral_solution.content,
        solution_2:cohere_solution.content
    }
}

const judgeNode:GraphNode<typeof State> = async (state:typeof State)=>{
    const { solution_1,solution_2 } = state

    const judge = createAgent({
        model:geminiModel,
        tools:[],
        responseFormat:providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        }))
    })

    const judgeResponse = await judge.invoke({
        messages:[
            new HumanMessage(
                `You are a judge tasked with evaluating two solutions to a problem. the problem is as follows: ${state.messages[0].content}. the first solution is: ${solution_1}. the second solution is: ${solution_2}. Please evaluate both solutions and provide a score between 0 and 10 for each, where 0 means the solution is completely ineffective and 10 means the solution is perfect. Your response should be in the following format: { "solution_1_score": X, "solution_2_score": Y } where X and Y are the scores for solution 1 and solution 2 respectively.`
            )
        ]
    })

    const result =judgeResponse.structuredResponse

    return {
        judge_recommendation:result
    }
}

const graph = new StateGraph(State)
    .addNode("solution",solutionNode)
    .addNode("judge",judgeNode)
    .addEdge(START,"solution")
    .addEdge("solution","judge")
    .addEdge("judge",END)
    .compile()

export default async function(userMessages:string){
    const results = await graph.invoke({
        messages:[
            new HumanMessage(userMessages)
            
        ]
    })

    console.log(results)

    return results.messages
}
    