const dotenv  = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

dotenv.config();
const url = process.env.MONGODB_URL;
let client;

async function connectClient() {
    if(!client){
        client = new MongoClient(url);
        await client.connect();
    }
};

const getAllUsers = async (req,res) => {
    try{
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const users = await userCollections.find({}).toArray();

        res.json(users);
    }catch(err){
        console.error("Error during fetching: ", err.message);
        res.status(500).send("Server error");
    }
};

const signup = async (req, res) => {
    console.log("SIGNUP FUNCTION VERSION: v2");
    const {username, password, email} = req.body;
    try{
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const user = await userCollections.findOne({username});
        
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            hashedPassword,
            email,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        };
        
        const result = await userCollections.insertOne(newUser);
        const token = jwt.sign({id:result.insertedId}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.json({token, userId: result.insertedId});
    }catch(err){
        console.error("Error during signup", err.message);
        res.status(500).send("Server Error");
    }
};

const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const user = await userCollections.findOne({email});
        
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});         
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1h"});

        res.json({token, userId:user._id});
    }catch(err){
        console.error("Error during login:", err.message);
        res.status(500).send("Server error!");
    }
}

const getUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try{
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const user = await userCollections.findOne({
            _id: new ObjectId(currentId),
        });

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
        const updateFields = {email};
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.hashedPassword = hashedPassword;
        }
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const result = await userCollections.findOneAndUpdate(
            { _id: new ObjectId(currentId) },
            { $set: updateFields },
            { returnDocument : "after"}
        );

        if(!result){
            return res.status(404).json("User not found");
        }

        res.json(result);
    }catch(err){
        console.error("Error during updating: ", err.message);
        res.status(500).send("Server Error");
    }
}

const deleteUserProfile = async (req, res) => {
    const currentId = req.params.id;
    try{
        await connectClient();
        const db = client.db("test");
        const userCollections = db.collection("users");

        const result = await userCollections.findOneAndDelete({
            _id: new ObjectId(currentId)
        });
        
        if(!result){
            return res.status(404).json("User not found");
        }

        res.json({message : "User deleted successfully"});
    }catch(err){
        console.error("Error during deleting:", err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
};