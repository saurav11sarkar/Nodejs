const express = require('express');
const { getUser, getTest, getRegister } = require('../controller/user.controller');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const name = Date.now()+ "-" + file.originalname;
        cb(null, name)
    }
});

const upload = multer({ storage: storage })

router.get('/', getUser);
router.get('/test', getTest);


router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.post('/register', upload.single('image'), (req,res)=>{
    res.status(200).send("File uploded")
})


module.exports = router;
