// const { ObjectId } = require('mongoose').Types;
const { User, Thought} = require('../models');

module.exports = {
    // get all users
    getUsers(req,res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    // get a user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },
    // put a new update
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true}
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // delete a user 
    removeUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId})
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'no user exists'})
                    : Thought.findOneAndUpdate(
                        { user: req.params.userId},
                        { $pull: { user: req.params.userId}},
                        { new: true}
                    )
            )
            .then((thought) =>
                !thought
                    ?res.status(404).json({ message: 'user deleted, but no thoughts found'})
                    :res.json({ message: 'user is deleted'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    }
}