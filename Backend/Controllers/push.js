const fs = require("fs").promises;
const path = require("path");
const {s3, S3_BUCKET} = require("../Config/aws-config");
const axios = require("axios")

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");
    const configPath = path.join(repoPath, "config.json")

    try{
        const commitDirs = await fs.readdir(commitsPath);
        const configData = await fs.readFile(configPath);

        const config = JSON.parse(configData)

        for(const commitDir of commitDirs){
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);
            

            for(const file of files){
                if(file === "commit.json") continue;

                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };

                await s3.upload(params).promise();

                await axios.put(`http://localhost:3000/repo/update/${config.repoId}`,
                    {
                        content: file,
                    }
                )
            }
        }

        console.log("All commits pushed to S3"); 
    }catch(err){
        console.log("Error pushing to s3:", err);
    }
}

module.exports = pushRepo;