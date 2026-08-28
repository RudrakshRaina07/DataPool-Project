const express = require("express")
const commitController = require("../Controllers/commitController")

const commitRouter = express.Router()

commitRouter.post("/commit/create", commitController.createCommit)
commitRouter.get("/commit/repository/:id", commitController.getRepositoryCommits)

module.exports = commitRouter