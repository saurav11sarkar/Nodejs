const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello I am home route")
})

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})