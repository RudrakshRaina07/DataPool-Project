const fs = require("fs").promises
const axios = require("axios");
const path = require("path")

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".datapool")
    const configPath = path.join(repoPath, "config.json")

    try {
        const configData = await fs.readFile(configPath, "utf-8")

        const config = JSON.parse(configData)

        const response = await axios.get(`http://localhost:3000/repo/${config.repoId}`)

        const repository = response.data
        const files = repository.content || []

        if(files.length == 0){
            console.log("Nothing to pull");
            return;
        }

        const latestFiles = new Map()

        for(const file of files){
            latestFiles.set(
                file.fileName,
                file
            )
        }

        for(const file of latestFiles.values()){
            const fileResponse = await axios.post(`http://localhost:3000/file/content`,
                {
                    s3Key: file.s3Key
                }
            )

            const content = fileResponse.data.content
            const filePath = path.join(process.cwd(), file.fileName)

            await fs.writeFile(filePath, content, "utf-8")

            console.log(`Pulled ${file.fileName} from datapool`);
            
        }

        console.log("Pull completed successfully");
        
    } catch (error) {
        console.error("Unable to pull: ", error.response?.data || error.message)
    }
}

module.exports = pullRepo