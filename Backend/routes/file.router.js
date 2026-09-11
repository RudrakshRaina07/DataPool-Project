const express = require("express")

const fileController = require("../Controllers/fileController")

const fileRouter = express.Router()

fileRouter.post("/file/content", fileController.getFileContent)
fileRouter.post("/file/upload", fileController.uploadFile)

module.exports = fileRouter;
