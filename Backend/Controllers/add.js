const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");
    const stagingFile = path.join(stagingPath, "staging.json")
    try{
        await fs.mkdir(stagingPath, {recursive: true});

        const absolutePath = path.resolve(filePath);
        const fileName = path.basename(filePath);

        let stagingData = {
            files: []
        }

        try {
            const existingData = await fs.readFile(stagingFile, "utf-8")
            stagingData = JSON.parse(existingData)
        } catch{
            // staging.json doesn't exists yet
        }

        const alreadyStaged = stagingData.files.some(
            file => file.filePath === absolutePath
        )

        if(!alreadyStaged){
            stagingData.files.push({
                filePath: absolutePath,
                fileName
            })
        }

        await fs.writeFile(
            stagingFile,
            JSON.stringify(stagingData, null, 2)
        )

        console.log(`File ${fileName} is added to staged area`);
    }catch(err){
        console.error("Falied in staging file:", err);
    }
}

module.exports = addRepo;