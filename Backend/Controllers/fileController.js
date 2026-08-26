const {s3, S3_BUCKET} = require("../Config/aws-config");

const getFileContent = async (req, res) => {
    const {s3Key} = req.body

    try {
        if(!s3Key){
            return res.status(400).json({
                error: "S3 key is required"
            })
        }

        const params = {
            Bucket: S3_BUCKET,
            Key: s3Key,
        }

        const data = await s3.getObject(params).promise()

        const content = data.Body.toString("utf-8")

        return res.status(200).json({
            content
        })

    } catch (error) {
        console.error("Error fetching file from S3: ", error.message)

        return res.status(500).json({
            error: "Unable to fetch files"
        })
    }
}

module.exports = {
    getFileContent
}