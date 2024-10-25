const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User } = require('./models/user.model');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const passport = require('passport');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

require('./configs/passport.config');

// home route
app.get('/', (req, res) => {
    res.status(200).send("<h1>Welcome to the server</h1>");
});


// register route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (user) return res.status(400).send("Userv alrady exists");
        const hassPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hassPassword
        })
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Userv is create successfuly",
            user: {
                id: newUser._id,
                username: newUser.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


// login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (!user) return res.status(401).send({ message: "User is not found" })
        const haspassword = await bcrypt.compare(password, user.password);
        if (!haspassword) return res.status(401).send({ message: "password is not found" })

        // jwt token generate

        const payload = {
            id: user._id,
            username: user.username
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d"
        })
        return res.status(200).send({
            success: true,
            message: "Successfully login",
            token: "Bearer " + token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


// profile route
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        return res.status(200).send({
            success: true,
            user:{
               id:req.user._id,
               username:req.user.username
            }
        });
    }
);


// error handle
app.use((req, res) => {
    res.status(404).json({ message: "route not found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: "server error" })
})


module.exports = app;