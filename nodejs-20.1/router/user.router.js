const { getAllUser, getOneUser, postUser, deleteUser, putUser } = require('../controller/user.controller');
const router = require('express').Router();

router.get('/', getAllUser)
router.get('/:id', getOneUser);
router.post('/', postUser);
router.delete('/:id', deleteUser);
router.put('/:id', putUser);


module.exports = router;