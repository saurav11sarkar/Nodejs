const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const USER = require('./models/user.model');
require('./models/db.model')

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const allUser = await USER.find();
        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get('/:id', async (req, res) => {
    try {
        const onUser = await USER.findById(req.params.id);
        res.status(200).json(onUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

app.post('/', async (req, res) => {
    try {
        const newUser = new USER({
            name:req.body.name,
            age:Number(req.body.age),
            email:req.body.email
        })
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await USER.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

app.put('/:id', async (req, res) => {
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
});


app.use((req, res) => {
    res.status(404).json({
        message: "This page is not Found"
    })
})
app.use((req, res) => {
    res.status(500).json({
        message: "Server Error"
    })
})

module.exports = app;