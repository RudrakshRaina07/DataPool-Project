const fs = require("fs").promises
const path = require("path")

async function initRepo(repoId) {

    if(!repoId){
        console.log("Repository ID is required");
        console.log("Usage: datapool init <repoId>");
        return;
    }

    const repoPath = path.resolve(process.cwd(), ".datapool")

    try {
        await fs.mkdir(repoPath, {recursive: true})

        await fs.mkdir(
            path.join(repoPath, "staging"),
            { recursive: true}
        )

        await fs.mkdir(
            path.join(repoPath, "commits"),
            { recursive: true}
        )

        await fs.writeFile(
            path.join(repoPath, "HEAD"),
            ""
        )

        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify(
                {
                    repoId: repoId
                },
                null,
                2
            )
        )

        await fs.writeFile(
            path.join(repoPath, "staging", "staging.json"),
            JSON.stringify(
                {
                    files: []
                },
                null,
                2
            )
        )

        console.log("Initialized empty Datapool repository");
        
    } catch (error) {
        console.error("Error initializing Datapool repository")
    }
}

module.exports = initRepo