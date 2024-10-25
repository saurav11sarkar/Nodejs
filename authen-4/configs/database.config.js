const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/passAuthJwt')
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;