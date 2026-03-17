import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage,SystemMessage } from "langchain"

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});


//johbhi puchege uska response dene ke liye yeh fucntion
export async function generateResponse(message){

    const response = await geminiModel.invoke([
        new HumanMessage(message)
    ])
    return response.text
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