const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
});
app.get('/circle', (req,res)=>{
    res.sendFile(__dirname+"/circle.html")
});
app.get('/triangle', (req,res)=>{
    res.sendFile(__dirname+"/triangle.html")
});

app.post('/circle', (req,res)=>{
    const {radius} = req.body;
    const area = Math.PI * parseFloat(radius) * parseFloat(radius);
    res.send(`Curcle is calcute => ${area.toFixed(2)}`);
});
app.post('/triangle', (req,res)=>{
    const {base, height} = req.body;
    const area = 0.5* parseFloat(base) * parseFloat(height);
    res.send(`Trianguale is calcute => ${area.toFixed(2)}`);
});


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`)
});