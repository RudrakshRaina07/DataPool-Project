const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const RepositorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },

    description: {
        type: String,
    },

    content: [{
        type: String,
    }],

    visibility: {
        type: Boolean,
        default: false,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    issues: [{
        type: Schema.Types.ObjectId,
        ref: "Issue"
    }],
});

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports =  Repository;