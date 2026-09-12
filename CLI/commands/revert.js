const fs = require('fs').promises
const axios = require('axios');
const path = require('path')

async function revertRepo(commitId) {
    const repoPath = path.resolve(process.cwd(), ".datapool")
    const configPath = path.join(repoPath, "config.json")

    try {
        if(!commitId){
            console.log("Commit ID is required");
            return;
        }

        const configData = await fs.readFile(configPath, "utf-8")
        const config = JSON.parse(configData)

        const response = await axios.get(`http://localhost:3000/repo/${config.repoId}`)

        const repository = response.data

        const files = repository.content || []

        const commitFiles = files.filter(
            file => file.commitId === commitId
        )

        if(commitFiles.length === 0){
            console.log(`No files found for commit ${commitId}`);
            return;
        }

        for(const file of commitFiles){
            const fileResponse = await axios.post(`http://localhost:3000/file/content`,
                {
                    s3Key: file.s3Key
                }
            )
            
            const content = fileResponse.data.content

            const filePath = path.join(process.cwd(), file.fileName)

            await fs.writeFile(filePath, content, "utf-8")

            console.log(`Reverted ${file.fileName}`);
            
        }

        console.log(`Commit ${commitId} successfully reverted`);
        

    } catch (error) {
        console.error("Unable to revert: ", error.response?.data || error.message)
    }
}

module.exports = revertRepo