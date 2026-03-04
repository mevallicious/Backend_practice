const express = require("express")
const songRouter = express.Router()
const songController = require("../controllers/song.controller")
const upload =require("../middlewares/upload.middleware")

/**
 * POST - /api/songs
 * to upload a song 
 */

songRouter.post("/",upload.single("song"),songController.uploadSong)

/**
 * GET -/api/songs/:moodid
 * to get the mood of the user
 */

songRouter.get("/",songController.getSong)

module.exports =songRouter