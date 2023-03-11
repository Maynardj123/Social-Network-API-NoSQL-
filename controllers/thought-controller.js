const { User ,Thought} = require('../models')

module.exports = {
    // this will grab all the current thoughts and display them
    getThoughts(req,res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    // this will grab a single thought and display it
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    // used to create a new thought 
    createThought(req,res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId},
                    { $push: { thoughts: thought._id}},
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'thought created, but no users with this ID'})
                        : res.json({ message: 'thought created'})
                )
                .catch((err) => {
                    console.error(err);
                })
    },
    // Update a single thought so it contains new information
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            {runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },

    // thought delete
    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    // could be wrong below with connecting reactions
                    // : User.deleteMany({ _id: { $in: thought.reactions}})
                    : res.json(thought)
            )
            .then(() => res.json({ message: 'thought deleted '}))
            .catch((err) => res.status(500).json(err))
    }
}