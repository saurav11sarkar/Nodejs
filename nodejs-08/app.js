const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("I am get request at home route");
});
app.post('/', (req,res)=>{
    res.send("I am post request at about route");
});
app.put('/', (req,res)=>{
    res.send("I am put request at about route");
});
app.delete('/', (req,res)=>{
    res.send("I am delete request at about route");
});

app.use((req,res)=>{
    res.status(404).send("Sorry can't find the page");
});


module.exports = app;