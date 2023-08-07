const { Schema, model } = require('mongoose');

const wallPostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    date: {
        type: Date,
        default: Date.now
    },

    text: {
        type: String,
        required: true
    }

});

module.exports = model("WallPost", wallPostSchema);