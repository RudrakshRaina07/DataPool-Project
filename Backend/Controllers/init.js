const fs = require("fs").promises
const path = require("path");



async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try{
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitsPath, {recursive: true});
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({bucket: process.env.BUCKET_S3})
        );
        console.log("Repository Initialised successfully");
    }catch(err){
        console.error("Error in initialising repository :", err);
    }
}

module.exports = initRepo;