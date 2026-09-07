const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const contributionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    date: {
        type: Date,
        required: true
    },

    count: {
        type: Number,
        default: 0,
    }
}, {timestamps: true})

contributionSchema.index(
    {userId: 1, date: 1},
    {unique: true}
)

const Contribution = new mongoose.model("Contribution", contributionSchema)
module.exports = Contribution