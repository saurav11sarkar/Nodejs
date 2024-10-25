const mongoose = require('mongoose');
require("dotenv").config();

const MONGO_URL= process.env.MONGO_URL;
exports.connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Database is connecting')
    } catch (error) {
        console.log(error.message)
    }
}