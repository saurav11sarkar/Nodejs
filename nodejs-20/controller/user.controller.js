// const path = require('path');
const user = require('../models/user.model');

const getUser = async (req, res) => {
    try {
        const allUser = await user.find();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).sand(error.message)
    }
};

const getOneuser = async (req, res) => {
    try {
        const oneuser = await user.findById(req.params.id)
        res.status(200).json(oneuser)
    } catch (error) {
        res.status(500).sand(error.message);
    }
};

const postUser = async (req, res) => {
    try {
        const newUser = new user({
            name: req.body.name,
            age: Number(req.body.age)
        });
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).sand(error.message);
    }
};

const putUser = async (req, res) => {
    try {
        const updateUser = await user.findById(req.params.id)
        updateUser.name = req.body.name;
        updateUser.age = Number(req.body.age);
        await updateUser.save();
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).sand(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleteOne = await user.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteOne)
    } catch (error) {
        res.status(500).sand(error.message);
    }
};


module.exports = { getUser, getOneuser, postUser, putUser, deleteUser };