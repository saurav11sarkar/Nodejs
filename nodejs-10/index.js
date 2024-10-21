const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res)=>{
    // const id = req.query.id;
    // const name = req.query.name;
    const {id=100,name='saurav'} = req.query;
    res.send(`<h1>Student id: ${id} Name: ${name} </h1>`);
})

app.get('/userId/:id/userAge/:age', (req,res)=>{
    const {id,age}= req.params;
    res.send(`student id: ${id} , age is : ${age}`);
})

app.get('/userId', (req,res)=>{
    const {id,name} = req.headers;
    res.send(`student id: ${id} , age is : ${name}`)
})

app.listen(PORT, ()=>{
    console.log(`Server is runing http://localhost:${PORT}`);
})