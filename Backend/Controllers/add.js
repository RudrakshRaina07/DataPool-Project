const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");
    try{
        await fs.mkdir(stagingPath, {recursive: true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));

        console.log(`File ${fileName} is added to staged area`);
    }catch(err){
        console.error("Falied in staging file:", err);
    }
}

module.exports = addRepo;