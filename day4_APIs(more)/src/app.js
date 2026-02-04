/*
    server ko create karna 
    server ko config karna
*/
const express = require("express")

const app = express()

app.use(express.json())

let notes =[]

app.post("/notes",(req,res)=>{
    res.send("note created")
    notes.push(req.body)
    console.log(notes)
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

/* params */
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.send("note delted")
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("updated succesfully")
})


module.exports = app