const USER = require("../models/user.model");

const getAllUser = async (req, res) => {
    try {
        const allUser = await USER.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getOneUser = async (req, res) => {
    try {
        const onUser = await USER.findById(req.params.id);
        res.status(200).json(onUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const postUser = async (req, res) => {
    try {
        const newUser = new USER({
            name: req.body.name,
            age: Number(req.body.age),
            email: req.body.email
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await USER.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const putUser = async (req, res) => {
    try {
        const updateUser = await USER.findById(req.params.id);
        updateUser.name = req.body.name;
        updateUser.age = Number(req.body.age);
        updateUser.email = req.body.email;
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { getAllUser, getOneUser, postUser, deleteUser, putUser };
