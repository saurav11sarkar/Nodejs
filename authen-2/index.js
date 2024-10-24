const express = require('express');
const cors = require('cors');
const { config, connectDB } = require('./configs/user.config');
const router = require('./app');


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

app.use(router)

app.use((req,res)=>{
    res.status(404).json({message:"This page is not create"})
})
app.use((req,res)=>{
    res.status(500).json({message:"Server Brocken"})
})

app.listen(config.PORT, ()=>{
    console.log(`server is running http://localhost:${config.PORT}`);
    connectDB();
})