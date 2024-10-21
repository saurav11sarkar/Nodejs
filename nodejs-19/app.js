// import
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./router/user.route')


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use(userRouter)


// Middleware error handeler
app.use((req, res) => {
    res.status(404).send("Not a page")
});
app.use((err,req, res,next) => {
    console.log(err.stack);
    res.status(500).json({
        message:'server error'
    });
});

module.exports = app;