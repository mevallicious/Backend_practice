const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb+srv://meval:Qmqy89WRz1Jkb0nk@cluster0.dqbensg.mongodb.net/day6")
    .then(()=>{console.log("serverconnected")})
}

connectToDB()

app.listen(3000,()=>{
    console.log("server running on port 3000")
})