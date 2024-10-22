const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan("dev"));

app.get('/product', (req,res)=>{
    res.status(200).send("List all the product");
});
app.post('/product', (req,res)=>{
    res.status(201).send("create a product");
});


const port = 3000;
app.listen(port, ()=>{
    console.log(`server is running http://localhost:${port}`);
});