const dotenv = require('dotenv');
dotenv.config();

const dev = {
    db:{
        url: process.env.DB_URL || "mongodb://localhost:27017/userDemo"
    }
}

module.exports = dev;