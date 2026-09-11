const fs = require('fs').promises;
const path = require("path");
const {v4 : uuidv4} = require("uuid");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".datapool");
    const stagedPath = path.join(repoPath, "staging");
    const stagingFile = path.join(stagedPath, "staging.json")
    const commitPath = path.join(repoPath, "commits");
    const headPath = path.join(repoPath, "HEAD");

    try{
        const stagingData = await fs.readFile(
            stagingFile,
            "utf-8"
        )

        const staging = JSON.parse(stagingData)

        if(!staging.files || staging.files.length === 0){
            console.log("Nothing to commit");
            return;
        }

        const commitId = uuidv4();
        const commitDir = path.join(commitPath, commitId);

        await fs.mkdir(commitDir, {recursive : true});

        const commitInfo = {
            message,
            date: new Date().toISOString(),
            files: staging.files
        }

        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify(commitInfo, null, 2));

        await fs.writeFile(
            headPath,
            commitId
        )

        await fs.writeFile(
            stagingFile,
            JSON.stringify({files: []}, null, 2)
        )

        console.log(`Commit ${commitId} created with message:`, message);

    }catch(err){
        console.error("Error committing files:", err);
    }

}

module.exports = commitRepo;