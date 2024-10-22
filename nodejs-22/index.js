const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// database connectet
const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/fileUpload')
        console.log('database connecting');   
    } catch (error) {
        console.log("db not connected");
        console.log(error);
        process.exit(1);
    }
};

// create model

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "user name is required"]
    },
    email:{
        type:String,
        required:[true, "user email is required"]
    },
    image:{
        type:String,
        required:[true, "user image is required"]
    },
});

const User = mongoose.model("File_uploded", userSchema);

// file uploded
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

// router

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/register', upload.single('image'), async (req, res) => {
    try {
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            image:req.file?.filename
        });
        await newUser.save();
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
    await connectDB();
});
