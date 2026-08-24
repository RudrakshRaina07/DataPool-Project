const mongoose = require("mongoose");
const Issue = require("../models/issueModel");
const Repository = require("../models/repoModel");

const createIssue = async (req, res) => {
    const {title, description} = req.body;
    const { id } = req.params;
    try{
        if(!title || !description){
            return res.status(400).json({error : "Title and description required"});
        }

        const issue = new Issue ({
            title,
            description,
            repository : id,
        })

        console.log("Created issue: ", issue._id)

        await issue.save();

        const repository = await Repository.findById(id);

        if(!repository){
            return res.status(404).json({
                error: "Repository not found"
            })
        }

        const updatedRepo = await Repository.findByIdAndUpdate(id,
             {
                $push: {
                    issues: issue._id,
                },
            },
            {
                new: true
            }
        )

        console.log("Repo updated sucessfully: ", updatedRepo.issues)

        return res
        .status(201)
        .json({
            message: "Issue created successfully",
            issue,
            repository: updatedRepo,
        })
    }catch(err){
        console.error("Error during creating repository: ", err.message);
        res.status(500).json("Server error");
    }
}

const updateIssueById = async (req, res) => {
    const { id } = req.params;
    const {title, description, status} = req.body;

    try{
        const issue = await Issue.findById(id);

        if(!issue){
            return res.status(404).json({error : "Issue not found!"});
        }

        if(status && !["open", "closed"].includes(status)){
            return res.status(400).json({error: "Status must be open or closed"});
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json(issue);
    }catch(err){
        console.error("Error during updating issue: ", err.message);
        res.status(500).json("Server error");
    }
}

const deleteIssueById = async (req, res) => {
    const { id } = req.params;
    try{
        const issue = await Issue.findByIdAndDelete(id);

        if(!issue){
            return res.status(404).json({error: "Issue not found!"})
        }

        res.json({message: "Issue deleted"});
    }catch(err){
        console.error("Error during deleting repo: ", err.message);
        res.status(500).json("Server error");
    }
}

const getAllIssues = async (req, res) => {
    const { id } = req.params;
    try{
        const issues = await Issue.find({ repository : id});
        if(!issues || issues.length == 0){
            return res.status(404).json({error: "Issue not found!"});
        }

        res.status(200).json(issues);

    }catch(err){
        console.error("Error during fetching issues: ", err.message);
        res.status(500).json("Server error");
    }
}

const getIssueById = async (req, res) => {
    const { id } = req.params;

    try{
        const issue = await Issue.findById(id);

        if(!issue){
            return res.status(404).json({error : "Issue not found!"});
        }

        res.json(issue);
    }catch(err){
        console.error("Error during fetching issue: ", err.message);
        res.status(500).json("Server error");
    }
}

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};