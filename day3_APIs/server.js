const express = require("express") //to require express package

const app = express() //create an instance of the server

app.use(express.json())  // to read the json data of req.body cause express cant read it on its own

let notes = []


app.post("/notes",(req,res)=>{     // to send data from client to server  (new data banane ke liye)
    notes.push(req.body)
    res.send("notes created")
})

app.get("/notes",(req,res)=>{    // to fetch data from the server to client  
    res.send(notes)             // (joh data bananya us fetchkarane ke liye taaki show karsake)
})

app.delete("/notes:index",(req,res)=>{   // koi bhi data dleete karne ke liye with the help of index
    delete notes[req.body]                               // joh index number daalege voh delete karsakte hai 
})

app.listen(3000,()=>{                  //calling the server 
    console.log("server connected")
})
