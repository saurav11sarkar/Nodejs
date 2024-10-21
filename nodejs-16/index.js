const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const myMiddleware = (req, res, next) => {
    console.log("Middleware active");
    req.currentTime = new Date(Date.now());
    next();
};
app.use(myMiddleware);

app.get('/', (req, res) => {
    console.log("I am home. " + req.currentTime);
    res.send("Hello, I am the Home Route.");
});

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.use((req, res) => {
    res.status(404).send("Bad URL");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
