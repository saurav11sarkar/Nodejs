const mongoose = require('mongoose');

const userSchma = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createOn:{
        type:Date,
        default:Date.now
    }
});

const USER = mongoose.model("User", userSchma);
module.exports = USER;