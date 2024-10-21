const users = require("../models/user.model");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.getHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
}

exports.getUser = (req, res) => {
    res.status(200).json(users);
};

exports.postUser = (req, res) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(200).json(users);
}

exports.putUser = (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    users.filter((user) => user.id === id).forEach(selectUser => {
        selectUser.name = name;
        selectUser.email = email;
    });
    res.status(201).json(users);
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json(users);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
