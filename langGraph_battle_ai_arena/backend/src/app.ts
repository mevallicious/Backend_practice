import express from "express"
import runGraph from "./services/graph.ai.service"


const app =express()

app.get('/health',(req,res)=>{
    res.status(200).json({status:'ok'})
})

app.get("/", async (req, res) => {
   
    const result = await runGraph("Write an article for developers in F1 racing")
    res.status(200).json(result)

})

export default app