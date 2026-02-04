const express = require("express") //express package ko require kiya

const app = express() // server ka ek instance create kiya

app.get("/",(req,res)=>{
    res.send("hello World")
})

app.listen(3000)