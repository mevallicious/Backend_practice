import "dotenv/config"
import { MistralAIEmbeddings } from "@langchain/mistralai";
import fs from "fs"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFParse } from "pdf-parse"
import {Pinecone} from "@pinecone-database/pinecone"


const pc =new Pinecone({
    apiKey:process.env.PINECONE_API_KEY,
})

const index = pc.index(process.env.PINECONE_INDEX_NAME)

// let databuffer = fs.readFileSync('./interview-questions.pdf')

// const parser = new PDFParse({
//     data:databuffer
// })

// const data = await parser.getText()

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model:"mistral-embed"    
})


// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize:400,
//     chunkOverlap:0
// })

// const chunks = await splitter.splitText(data.text)

// const docs =await Promise.all(chunks.map(async (chunk)=>{
//     const embbedding = await embeddings.embedQuery(chunk)
//     return {
//         text:chunk,
//         embbedding
//     }
// }))

// const result = await index.upsert({
//     records:docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embbedding,
//         metadata:{
//             test:doc.text
//         }
//     }))
// })

const response = await embeddings.embedQuery("which is easiest question in react")

const queryResult = await index.query({
    vector :response,
    topK:2,
    includeMetadata:true
})

console.log(JSON.stringify(queryResult))