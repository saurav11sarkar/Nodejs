const express = require('express');
const { runValidation } = require('../validation/auth.validation');
const { postvalidation, getUser, postLogin } = require('../controller/user.controller');
const { userRegistationValidation, userLoginValidation } = require('../validation/userAuth.validation');
const router = express.Router();


router.get('/register', getUser);
router.post('/register',userRegistationValidation, runValidation, postvalidation);
router.post('/login', userLoginValidation,runValidation, postLogin);

module.exports = router;