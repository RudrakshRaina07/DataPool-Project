const express = require("express");
const userController = require("../Controllers/userController");
const authMiddleware = require("../middleware/authMiddleware")

const userRouter = express.Router();


userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/follow/:id", authMiddleware,userController.followUser)
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", authMiddleware,  userController.deleteUserProfile);
userRouter.delete("/unfollow/:id", authMiddleware, userController.unfollowUser)

module.exports = userRouter;