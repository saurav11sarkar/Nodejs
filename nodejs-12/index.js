const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname,"/register.html"))
})

app.post('/register', (req,res)=>{
    const {name, age} = req.body;
    res.status(200).json({
        name: name,
        age:age
    })
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
})