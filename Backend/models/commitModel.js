const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const commitSchema = new Schema({
    commitId:{
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    repository: {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        required: true,
    }
})  

const Commit = mongoose.model("Commit", commitSchema)

module.exports = Commit