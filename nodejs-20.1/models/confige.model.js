const dotenv = require('dotenv');
dotenv.config();

const dev = {
    uri:{
        db:process.env.DB_URL
    }
}

module.exports = dev;