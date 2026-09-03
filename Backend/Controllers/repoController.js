const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createRepository = async (req, res) => {
    const {name, description, content, visibility, issues} = req.body;
    const owner = req.user.id
    try{
        if(!name){
            return res.status(400).json({error: "Repository name is required!"});
        }

        if(!mongoose.Types.ObjectId.isValid(owner)){
            return res.status(400).json({error: "Invalid User Id!"});
        }

        const newRepository = new Repository({
            name,
            description,
            content,
            visibility,
            owner, 
            issues
        });

        const result = await newRepository.save();

        res.status(201).json({
            message: "Repository created successfully",
            repositoryId: result._id
        });
    }catch(err){
        console.error("Error during creating repository: ", err.message);
        res.status(500).send("Server Error");
    }
}

const getAllRepositories = async (req, res) => {
    try{
        const repositories = await Repository.find({})
            .populate("owner")
            .populate("issues");

        res.json(repositories);
    }catch(err){
        console.error("Error during fetching repositories:", err.message);
        res.status(500).send("Server Error");
    }
}

const fetchRepositoryById = async (req, res) => {
    const id = req.params.id;
    try{
        const repository = await Repository.findOne({_id : id})
            .populate("owner")
            .populate("issues");

        if(!repository){
            return res.status(404).json({message: "Repository not found"});
        }

        res.json(repository);
    }catch(err){
        console.error("Error during fetching repository: ", err.message);
        res.status(500).json("Server error");
    }   
}

const fetchRepositoryByName = async (req, res) => {
    const name = req.params.name;
    try{
        const repository = await Repository.findOne({name : name})
            .populate("owner")
            .populate("issues");

        if(!repository){
            return res.status(404).json({message: "Repository not found"});
        }

        res.json(repository);
    }catch(err){
        console.error("Error during fetching repository: ", err.message);
        res.status(500).json("Server error");
    }   
}

const fetchRepositoriesForCurrentUser = async (req, res) => {
    const id = req.params.userId;
    try{
        const repositories = await Repository.find({owner: id});


        return res.status(200).json({message:"Repositories Found", repositories: repositories});
    }catch(err){
        console.error("Error during fetching user repositories: ", err.message);
        res.status(500).json("Server error");
    }
}

const updateRepositoryById = async (req, res) => {
    const id = req.params.id;
    const {content, description} = req.body;
    
    try{
        const repository = await Repository.findById(id);

        if(!repository){
            return res.status(404).json({error:"Repository not found"});
        }

        if(content){
            repository.content.push({
                fileName: content.fileName,
                commitId: content.commitId,
                s3Key: content.s3Key
            });
        }

        if(description){
            repository.description = description;
        }

        const updatedRepo = await repository.save();

        res.json({
            message:"Repository updated successfully",
            repository: updatedRepo
        });
    }catch(err){
        console.error("Error during updating repository: ", err.message);
        res.status(500).json("Server error");
    }
}

const toggleVisibilityById = async (req, res) => {
    const id = req.params.id;
    
    try{
        const repository = await Repository.findById(id);

        if(!repository){
            return res.status(404).json({error:"Repository not found"});
        }

        if(repository.owner.toString() !== req.user.id){
            return res.status(403).json({
                error: "You are not the owner of this repository"
            })
        }

        repository.visibility = !repository.visibility;

        const updatedRepo = await repository.save();

        res.json({
            message:"Repository visibility toggled successfully",
            repository: updatedRepo
        });
    }catch(err){
        console.error("Error during toggling visibility: ", err.message);
        res.status(500).json("Server error");
    }
}

const deleteRepositoryById = async (req, res) => {
    const id = req.params.id;
    try{
        const repository = await Repository.findByIdAndDelete(id);

        if(!repository){
            return res.status(404).json({error:"Repository not found"});
        }

        if(repository.owner.toString() !== req.user.id){
            return res.status(403).json({
                error: "You are not the owner of this repository"
            })
        }
        

        res.json({message: "Repository deleted successfully"});
    }catch(err){
        console.error("Error during toggling visibility: ", err.message);
        res.status(500).json("Server error");
    }
}

const starRepository = async (req, res) => {
    const userId = req.user.id
    const repoId = req.params.id
    try {
        const repository = await Repository.findById(repoId)

        if(!repository){
            return res.status(400).json({error: "Repository not found"})
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet:{
                    starRepos: repoId
                }
            },
            {
                new: true
            }
        )

        if(!user){
            return res.status(400).json({error: "User not found"})
        }
        
        return res.status(200).json({message: "Repository starred successfully"})

    } catch (error) {
        console.error("Error starring repository: ", error.message)
        return res.status(500).json({
            error: "Server error"
        })
    }
}

const unstarRepository = async (req, res) => {
    const repoId = req.params.id
    const userId = req.user.id
    
    try {
        const repository = await Repository.findById(repoId)

        if(!repository){
            return res.status(400).json({error: "Repository not found"})
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    starRepos: repository._id
                }
            },
            {
                new: true
            }
        )

        if(!user){
            return res.status(400).json({error: "User not found"})
        }

        return res.status(200).json({
            message: "Repository unstarred successfully"
        })

    } catch (error) {
        console.error("Error unstarring repository: ", error.message)
        return res.status(500).json({
            error: "Server error"
        })
    }
}

module.exports = {
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoriesForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById,
    starRepository,
    unstarRepository
};