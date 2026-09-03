const express = require("express");
const repoController = require("../Controllers/repoController");
const authMiddleware = require("../middleware/authMiddleware");

const repoRouter = express.Router();

repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.post("/repo/create", authMiddleware, repoController.createRepository);
repoRouter.post("/repo/star/:id", authMiddleware, repoController.starRepository)
repoRouter.delete("/repo/star/:id", authMiddleware, repoController.unstarRepository)
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userId", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/repo/toggle/:id", authMiddleware, repoController.toggleVisibilityById);
repoRouter.delete("/repo/delete/:id", authMiddleware,repoController.deleteRepositoryById);

repoRouter.get("/repo/:id", repoController.fetchRepositoryById);

module.exports = repoRouter;