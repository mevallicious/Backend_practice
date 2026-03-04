const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors =require("cors")
const authRoutes =require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))


app.use("/api/auth",authRoutes)
app.use("/api/songs",songRoutes)

module.exports = app