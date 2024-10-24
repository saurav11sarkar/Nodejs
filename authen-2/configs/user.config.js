const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


exports.config = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL
}

exports.connectDB = async () => {
    try {
        await mongoose.connect(this.config.DB_URL)
        console.log('Data base is connect')
    } catch (error) {
        console.log(error)
    }
}