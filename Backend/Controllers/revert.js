const fs = require("fs");
const path = require("path");
const {promisify} = require("util");

const readdir = promisify(fs.readdir);
const copyfile = promisify(fs.copyFile);

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitPath = path.join(repoPath, "commits");

    try{
        const commitDir = path.join(commitPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files){
            if(file === "commit.json") continue;
            await copyfile(path.join(commitDir, file), path.join(parentDir, file));
        }
        console.log(`Commit ${commitID} successfully reverted`);
    }catch(err){
        console.log("Unable to revert:", err);
    }
}

module.exports = revertRepo;