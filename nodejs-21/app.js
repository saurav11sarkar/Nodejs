const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./router/user.route');


dotenv.config();
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use(router);


app.use((req,res)=>{
    res.status(404).json({
        message:"This page is not create"
    })
});
app.use((err,req,res,next)=>{
    res.status(500).json({
        message:"Server Error"
    })
});

module.exports = app;