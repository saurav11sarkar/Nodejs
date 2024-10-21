const express = require('express');
const cors = require('cors');
const userRouter = require('./router/user.route');
const productRouter = require('./router/product.route');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cors());

// 404 Middleware
app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
