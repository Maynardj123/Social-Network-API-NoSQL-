const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            Unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        thoughts: [thoughtSchema],
    },
    {

    }
)

const User = model('user', userSchema);

module.exports = User;