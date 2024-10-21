const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.post('/user', (req, res) => {
    const {name, age} = req.body;
    res.send(`wellcome ${name} , age : ${age}`);
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})