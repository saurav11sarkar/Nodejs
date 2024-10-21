const express = require('express');
const userRouter = require('./routes/users.route');
const app = express();

app.use(userRouter);

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendFile(__dirname+"/views/index.html");
});

// 404 route
app.use((req, res) => {
    res.statusCode(404).send('This Page is Undefined');
});

module.exports = app;
