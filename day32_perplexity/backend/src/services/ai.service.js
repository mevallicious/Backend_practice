import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage, tool ,createAgent} from "langchain"
import * as z from "zod"
import { searchInternet } from "./webSearch.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3-flash-preview",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});


const searchInternetTool = tool(
    searchInternet,
    {
        name:"searchInternet",
        description:"use this tool to search on internet for the relevant information to answer user queries",
        schema:z.object({
            query:z.string().describe("the search query to look up on the internet")
        })
    }
)

const agent = createAgent({
    model:mistralModel,
    tools:[searchInternetTool]
})

//johbhi puchege uska response dene ke liye yeh fucntion
export async function generateResponse(messages){
    console.log(messages)

    const response = await agent.invoke({
        messages:[
            new SystemMessage(`
                You are a helpful and precious assitant for answering questions.
                If you  don't know the answer, say you don't know.
                If the question requires up-to-date information,use the "searchInternet" tool to get the latest information`),
            ...messages.map(msg=>{
            if(msg.role =="user") {
                return new HumanMessage(msg.content)
            }
            else if(msg.role =="ai"){
                return new AIMessage(msg.content)
            }
        })]
    })
    return response.messages[response.messages.length-1].text
}

//jo bhi new chat khulegi uska title dene ke liye yeh fuction
export async function generateChatTitle(message){
    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for the chat conversations.
            
        User will provide the first message of the chat conversation, and you will generate a suitable title for the conversation based on that message. The title should be engaging, clear, relevant, ideally less than 5 words, and should capture the essence of the chat topic.    
            `),
        new HumanMessage(`
            Generate a title for a chat based on the following first message:
            ${message}
        `)
    ])

    return response.text
}