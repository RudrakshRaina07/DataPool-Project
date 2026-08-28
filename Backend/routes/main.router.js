const express = require("express");
const mainRouter = express.Router();
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require('./issue.router');
const fileRouter = require("./file.router");
const commitRouter = require("./commit.router")

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);
mainRouter.use(fileRouter)
mainRouter.use(commitRouter)

mainRouter.get("/", (req, res) => {
    res.send("Welcome!");
});

module.exports = mainRouter;