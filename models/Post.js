const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    image: {
        type: String,
        default: "post-image.jpg"
    },

    date: {
        type: Date,
        default: Date.now
    },

    text: {
        type: String,
        required: true
    },
    check: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = model("Post", postSchema);