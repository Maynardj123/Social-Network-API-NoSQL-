const mongoose = require("mongoose");
const connect = require("../config/connection.js")

const {User} = require("../models");

// console.log("Seeding started...")

(async()=>{
    await User.deleteMany({})

    await User.create({username:"Jacob", email:"jacob@gmail.com"})
    await User.create({username:"Bob", email:"bob@gmail.com"})
})();


// console.log("Seeding finished...")