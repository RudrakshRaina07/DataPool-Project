const dotenv  = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel")


const getAllUsers = async (req,res) => {
    try{
        const users = await User.find({}).populate("repositories").populate("followedUsers").populate("starRepos").populate("followedUsers").populate("followers")

        res.json(users);
    }catch(err){
        console.error("Error during fetching users: ", err.message);
        res.status(500).json({
            error: "Server error"
        })
    }
};

const signup = async (req, res) => {
    const {username, password, email} = req.body;
    try{
        if(!username || !email){
            return res.status(400).json({error: "Username and email are required"})
        }

        const existingUser = await User.findOne({
            $or: [
                {username},
                {email}
            ]
        })
        
        if(existingUser){
            return res.status(400).json({message :"User already exists"});
        }

        if(!password){
            return res.status(400).json({error: "Password is required"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        });
        
        const result = await newUser.save()
        const token = jwt.sign({id: result._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.status(201).json({token, userId: result._id});
    }catch(err){
        console.error("Error during signup", err.message);
        res.status(500).json({error: "Server Error"});
    }
};

const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        if(!email){
            return res.status(400).json({error: "user email is required"})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});         
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});

        res.json({token, userId:user._id});
    }catch(err){
        console.error("Error during login:", err.message);
        res.status(500).json({
            error: "Server error"
        })
    }
}

const getUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try{
        const user = await User.findById(currentId)
                        .populate("repositories")
                        .populate("followedUsers")
                        .populate("starRepos")
                        .populate("followers")
                        .populate("followedUsers")
                        .select("-password")

        if(!user){
            return res.status(404).json({message :"User not found"});
        }
        
        res.send(user);
    }catch(err){
        console.error("Error during fetching: ", err.message);
        res.status(500).send("Server Error");
    }
}

const updateUserProfile = async (req, res) => {
    const currentId = req.params.id;
    const {email, password} = req.body;
    try{
        const updateFields = {};

        if(email){
            updateFields.email =  email;
        }

        if(password){
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt)
        }

        const updatedUser = await User.findByIdAndUpdate(
            currentId,
            {
                $set: updateFields
            },
            {
                new: true
            }
        )

        if(!updatedUser){
            return res.status(404).json({
                error: "User not found"
            })
        }

        res.json(updatedUser);
    }catch(err){
        console.error("Error during updating: ", err.message);
        res.status(500).json({
            error: "Server Error"
        });
    }
}

const deleteUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(currentId)

        if(!deletedUser){
            return res.status(404).json({message: "User not found"});
        }

        res.json({message : "User deleted successfully"});
    }catch(err){
        console.error("Error during deleting:", err.message);
        res.status(500).json({message: "Server error"});
    }
}

const followUser = async (req, res) => {
    const currentUserId = req.user.id
    const targetUserId = req.params.id

    try {
        if(currentUserId === targetUserId){
            return res.status(400).json({error: "You cannot follow yourself"})
        }

        const targetUser = await User.findById(targetUserId)
        if(!targetUser){
            return res.status(400).json({error: "User not found"})
        }

        const currentUser = await User.findById(currentUserId)
        if(!currentUser){
            return res.status(400).json({error: "Current user not found"})
        }

        await User.findByIdAndUpdate(
            currentUserId,
            {
                $addToSet: {
                    followedUsers: targetUserId
                }
            }
        )

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $addToSet: {
                    followers: currentUserId
                }
            }
        )

        return res.status(200).json({
            message: "User followed successfully"
        })

    } catch (error) {
        console.error("Error following user: ", error)
        return res.status(500).json({message: "Server error"})
    }
}

const unfollowUser = async (req, res) => {
    const currentUserId = req.user._id
    const targetUserId = req.params
    
    try {
        const targetUser = await User.findById(targetUserId)
        if(!targetUser){
            return res.status(400).json({error: "User not found"})
        }

        const currentUser = await User.findById(currentUserId)
        if(!currentUser){
            return res.status(400).json({error: "Current user not found"})
        }

        await User.findByIdAndUpdate(
            currentUserId,
            {
                $pull: {
                    followedUsers: targetUserId,
                }
            }
        )

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $pull:{
                    followers: currentUserId
                }
            }
        )

        return res.status(200).json({
            message: "User unfollowed successfully"
        })

    } catch (error) {
        console.error("Error unfollowing user: ", error)
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    followUser,
    unfollowUser
};