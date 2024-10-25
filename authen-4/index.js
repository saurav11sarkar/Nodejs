const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('./configs/database.config');
const User = require('./model/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
dotenv.config();
require("./configs/passport.config")


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


// router
app.get('/', async (req, res) => {
    try {
        const alluser = await User.find().select({username:1});
        res.status(200).send(alluser);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (user) return res.status(401).send("User name alrady exjict")
        const hashPassword = await bcrypt.hash(password, 10)
        const newuser = new User({
            username: username,
            password: hashPassword
        })
        await newuser.save();
        res.status(201).json({
            success: true,
            message: "User is create",
            user: {
                id: newuser._id,
                username: newuser.username
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/login', async (req, res) => { 
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username:username})
        if(!user) return res.status(401).send("User name is not found")
        const hashPassword = await bcrypt.compare(password,user.password)
        if(!hashPassword) return res.status(401).send("User password is not mash")
        
        const payload ={
            id:user._id,
            username:user.username
        }
        const token = jwt.sign(payload, 'secretkey',{
            expiresIn:'2h'
        })

        res.status(200).json({
            success:true,
            message:"successfully Login",
            token: "Bearar "+token
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
});

app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        return res.status(200).send({
            success: true,
            user:{
               id:req.user._id,
               username:req.user.username
            }
        })
    }
);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
    connectDB();
})