const express = require("express")
const app = express()
const noteModel = require("./models/notes.model")

app.use(express.json())

/*
    *   - post /notes
    *   - create all notes (create)
*/

app.post("/notes",async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"created successfully",
        note
    })
})

/*
    *   - get /notes
    *   - fetch all notes (read)
*/

app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()

     res.status(200).json({
        message:"found successfully",
        notes
    })
})

module.exports = app