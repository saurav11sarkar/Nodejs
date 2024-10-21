const express = require('express');
const path = require('path'); 
const router = express.Router();

router.get('/register', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/login', (req, res) => {
    // res.cookie('name', 'saurav');
    // res.cookie('age', 24);
    // res.clearCookie("name");
    // res.clearCookie("age");
    res.end();
});

module.exports = router;
