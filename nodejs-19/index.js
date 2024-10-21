const app = require('./app');




// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running http://127.0.0.1:${PORT}`)
});