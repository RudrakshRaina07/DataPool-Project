const fs = require("fs").promises;
const path = require("path");
const {s3, S3_BUCKET} = require("../Config/aws-config");
const axios = require("axios")

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");
    const configPath = path.join(repoPath, "config.json")
    const headPath = path.join(repoPath, "HEAD")

    try{
        const configData = await fs.readFile(configPath, "utf-8");

        const config = JSON.parse(configData)

        const commitId = await fs.readFile(headPath, "utf-8")

        const cleanCommitId = commitId.trim()

        const commitPath = path.join(commitsPath, cleanCommitId);
        const files = await fs.readdir(commitPath);
            

        for(const file of files){
            if(file === "commit.json") continue;

            const filePath = path.join(commitPath, file);
            const fileContent = await fs.readFile(filePath);

            const s3Key = `commits/${cleanCommitId}/${file}`

            const params = {
                Bucket: S3_BUCKET,
                Key: s3Key,
                Body: fileContent,
            };

            await s3.upload(params).promise();

            await axios.put(`http://localhost:3000/repo/update/${config.repoId}`,
                {
                    content: {
                        fileName: file,
                        commitId: cleanCommitId,
                        s3Key: s3Key,
                    }
                }
            )
        }

        console.log("All commits pushed to S3"); 
    }catch(err){
        console.log("Error pushing to s3:", err);
    }
}

module.exports = pushRepo;