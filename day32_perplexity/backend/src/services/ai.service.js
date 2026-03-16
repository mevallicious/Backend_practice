import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAI(){
    model.invoke("who won best actor in oscars 2024?").then((res)=>{
        console.log(res.text)
    })
}