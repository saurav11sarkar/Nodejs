const express = require('express');
const app = express();

app.get('/product/:id(\\d+)', (req,res)=>{
    res.send(`<h2>ID = ${req.params.id}</h2>`);
});

app.get('/product/:title([a-zA-Z]+)', (req,res)=>{
    res.send(`<h2>Title = ${req.params.title}</h2>`);
});

app.use((req,res)=>{
    res.status(404).json({
        message: '404 not found',
    });
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`);
});
