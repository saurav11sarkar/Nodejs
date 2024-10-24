const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./models/connect.model');
const { AuthUser } = require('./models/user.model');
dotenv.config();

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


app.get("/", (req, res)=>{
    res.status(200).sendFile(path.join(__dirname,"/views/index.html"))
});

app.post("/register", async(req,res)=>{
    try {
        const newUser = new AuthUser({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        await newUser.save();
        res.status(201).json({
            name:req.body.name,
            email:req.body.email
        });    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthUser.findOne({ email: email }); 
        if (user && user.password === password) {
            return res.status(200).json({ status: 'Valid User', name: user.name });
        } else {
            return res.status(404).json({ status: 'Not a valid User' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.use((req,res)=>{
    res.status(404).json({message: "This page is not create"});
})
app.use((err,req,res, next)=>{
    res.status(500).json({message: "Server Brocken"});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async ()=>{
    console.log(`Server is running http://localhost:${PORT}`);
    await connectDB();
})