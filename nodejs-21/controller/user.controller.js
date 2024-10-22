const path = require('path');

const getUser = (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
}

const getTest = (req, res) => {
    res.status(200).json({
        message: "This test case"
    });
};
const getRegister = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};

module.exports = { getUser, getTest, getRegister };