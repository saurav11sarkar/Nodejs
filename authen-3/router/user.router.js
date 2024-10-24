const express = require('express');
const { rootroute } = require('../controllers/user.controller');
const router = express.Router();
const bcrypt = require('bcrypt');
const PassAuth = require('../models/user.model');
const passport = require('passport');

// base url
router.get('/', rootroute);

// register : get
router.get('/register', (req, res) => {
    res.status(200).render('register.ejs');
});

// register : post
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await PassAuth.findOne({ username });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new PassAuth({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).redirect('/login');
        } else {
            res.status(400).send('User already exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// login : get
router.get('/login', (req, res) => {
    res.status(200).render('login.ejs');
});

// login : post
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' })
);

// profile protected route
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).render('profile.ejs', { user: req.user });
    } else {
        res.status(401).redirect('/login');
    }
});

// logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).redirect('/');
    });
});

module.exports = router;
