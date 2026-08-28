const Commit = require("../models/commitModel")
const Repository = require("../models/repoModel")

const createCommit = async (req, res) => {
    const {commitId, message, date, repositoryId} = req.body

    try {    
        if(!commitId || !message || !date || !repositoryId){
            return res.status(400).json({
                error: "commitId, message , date and repositoryId are required",
            })
        }
    
        const repository = await Repository.findById(repositoryId);
    
        if(!repository){
            return res.status(400).json({
                error: "Repository not found"
            })
        }
    
        const commit = new Commit({
            commitId,
            message, 
            date,
            repository: repositoryId
        })
    
        await commit.save();
    
        return res.status(201).json({
            message: "Commit created successfully",
            commit
        })
    } catch (error) {
        console.error("Error creating commit: ", error)
        return res.status(500).json({
            error: "Server error"
        })
    }
}

const getRepositoryCommits = async (req, res) => {
    const {id} = req.params;
    try {
        const commits = await Commit.find({
            repository: id,
        }).sort({date: -1});

        if(!commits){
            return res.status(400).json({
                error: "Commit not found"
            })
        }

        return res.status(200).json({
            message: "Commits fetched successfully",
            commits
        })

    } catch (error) {
        console.error("Error fetching repository commits: ", error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    createCommit,
    getRepositoryCommits
}