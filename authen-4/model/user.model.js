const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User = mongoose.model("USER", userSchema);
module.exports = User;