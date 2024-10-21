const path = require('path');


const getUser = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};


module.exports = { getUser };