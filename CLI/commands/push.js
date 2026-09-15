const fs = require("fs").promises;
const path = require("path");
const axios = require("axios")

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".datapool");
    const commitsPath = path.join(repoPath, "commits");
    const configPath = path.join(repoPath, "config.json")
    const headPath = path.join(repoPath, "HEAD")

    try{
        const configData = await fs.readFile(configPath, "utf-8");
        const config = JSON.parse(configData)

        const commitId = await fs.readFile(headPath, "utf-8")

        const cleanCommitId = commitId.trim()

        if(!cleanCommitId){
            console.log("Nothing to push");
            return;
        }

        const commitPath = path.join(commitsPath, cleanCommitId);

        const commitData = await fs.readFile(
            path.join(commitPath, "commit.json"),
            "utf-8"
        )
            
        const commitInfo = JSON.parse(commitData)

        if(!commitInfo.files || commitInfo.files.length === 0){
            console.log("Nothing to push");
            return;
        }
        

        for(const file of commitInfo.files){
            const filePath = file.filePath
            const fileContent = await fs.readFile(filePath);

            const response = await axios.post(`${process.env.API_URL}/file/upload`, 
                {
                    fileName: file.fileName,
                    commitId: cleanCommitId,
                    content: fileContent
                }
            )

            const s3Key = response.data.s3Key

            console.log(`Uploaded ${file.fileName} to datapool`);

            await axios.put(`${process.env.API_URL}/repo/update/${config.repoId}`,
                {
                    content: {
                        fileName: file.fileName,
                        commitId: cleanCommitId,
                        s3Key: s3Key,
                    }
                },
            )
        }

        await axios.post(`${process.env.API_URL}/commit/create`, {
            commitId: cleanCommitId,
            message: commitInfo.message,
            date: commitInfo.date,
            repositoryId: config.repoId
        })

        console.log("All commits pushed to S3"); 
        
    }catch(err){
        console.log("Error pushing to s3:", err);
    }
}

module.exports = pushRepo;