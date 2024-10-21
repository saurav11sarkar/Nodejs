const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router/user.route');
require('./models/db.model');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Router
app.use('/api/users',router);

// Error Handeller
app.use((req,res)=>{
    res.status(404).json({
        message:"This page is not found"
    });
});
app.use((req,res)=>{
    res.status(500).json({
        message:"Server Error"
    });
});

module.exports = app;