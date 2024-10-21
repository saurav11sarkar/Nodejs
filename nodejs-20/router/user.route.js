const express = require('express');
const { getUser, getOneuser, postUser, putUser, deleteUser } = require('../controller/user.controller');
const router = express.Router();

router.get('/', getUser);
router.get('/:id', getOneuser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;