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
            match: [/.+@.+\..+/,'Please use a valid email']
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,

    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;