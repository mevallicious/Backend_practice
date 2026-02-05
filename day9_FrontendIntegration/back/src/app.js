//server create karna and config karna

const express=require("express")
const cors = require("cors")
const path = require("path")

const app =express()

const noteModel =require("./models/note.model")

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


/*
    *-POST: to  create the notes in the database server
 */

app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body

    const note =await noteModel.create({
        title,description
    })

    res.status(201).json({
        mesaage:"node created successfully",
        note
    })
})

/*
    *-GET: to fetch the notes from the database server
 */

app.get("/api/notes",async (req,res)=>{

    const notes =await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})


/*
    *-DELETE: /api/notes/:id
    *- to delete note with id from req.params
 */

app.delete("/api/notes/:id",async (req,res)=>{

    const id=req.params.id

    const note = await noteModel.findByIdAndDelete(id)

     res.status(200).json({
        message:"notes fetched successfully"
    })
})


/*
    *-PATCH: /api/notes/:id
    *- update the description of the note
    *- req.body={description}
 */

app.patch("/api/notes/:id",async (req,res)=>{
    const id= req.params.id
    const {description} = req.body

    const note = await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
    message: "Note updated successfully.",
  });
})


app.use('*name',(req,res)=>{    //aisi koi route pe apna user req bhejta hai joh exist hi ni karti toh yeh kardo wildcard
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports =app