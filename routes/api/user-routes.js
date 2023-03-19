const router = require('express').Router();
const User = require("../../models/User")
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    // createFriend,
    // deleteFriend
    
} = require('../../controllers/user-controller')


// TODO: Move getUsers to controllers and re-import
// async function getUsers(req, res) {
//     // res.json([{
//     //     username:"a",
//     //     email:"a@a.com"
//     // }])
//     const users = await User.find({})
//     res.json(users)
// }

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .delete(removeUser)


// router.route('/:userId/friends')
//     .post(createFriend)
//     // .delete(deleteFriend)


module.exports = router;