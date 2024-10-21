const express = require('express');
const { getHome, getUser, postUser, putUser, deleteUser } = require('../controller/user.controller');

const router = express.Router();

// Define routes
router.get('/', getHome);
router.get('/user', getUser);
router.post('/user', postUser);
router.put('/user/:id', putUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
