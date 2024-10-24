const dotenv = require('dotenv');
const {  mongoose } = require("mongoose");
dotenv.config();

exports.connectDB = async () =>{
    try {
        await mongoose.connect(process.env.URL_DB)
        console.log("Mongodb is connected");
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}