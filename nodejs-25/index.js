const express = require('express');
const cors = require('cors');
const router = require('./router/user.router');
require("dotenv").config();

const app = express();

// mediler
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


// router
app.use('/api',router);


// error handeler
app.use((req, res) => {
    res.status(404).json({
        message: "This page is not create"
    })
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Server Error"
    })
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is Running http://localhost:${PORT}`)
})