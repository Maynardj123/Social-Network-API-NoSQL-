const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // ?
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // ?
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // ?
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const thought = model('thought', thoughtSchema);

module.exports = thought;