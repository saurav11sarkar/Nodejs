const mongoose = require('mongoose');
const config = require('./user.config');

const url = config.DB_URL;

exports.connectingDB = async ()=>{
    try {
        await mongoose.connect(url)
        console.log("Database is connecting");

    } catch (error) {
        console.log(error)
    }
}