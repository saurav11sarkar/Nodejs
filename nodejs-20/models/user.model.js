const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    createOn:{
        type:Date,
        default:Date.now
    },
});

const user = mongoose.model('User',userSchema);
module.exports = user;