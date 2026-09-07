const express = require("express");
const contributionController = require("../Controllers/contributionController");
const contributionRouter = express.Router()

contributionRouter.get("/contributions/:userId", contributionController.getContribution)

module.exports = contributionRouter