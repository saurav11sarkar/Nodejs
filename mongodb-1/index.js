const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// product schema
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// product model
const Product = mongoose.model("Product", productSchema);

// conncetion DB
const connectingDB = () => {
    mongoose.connect("mongodb://localhost:27017/test")
        .then(() => {
            console.log("Mongodb connected")
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        })
};

app.get("/", (req, res) => {
    res.status(200).send("Wellcome to server")
});

app.post("/product", async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.get("/product", async (req,res)=>{
    try {
        const readProduct = await Product.find();
        if(!readProduct){
            res.status(404).json({message: "This Product is emapty"})
        }
        res.status(200).json(readProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.get("/product/:id", async (req,res)=>{
    try {
        const readOne = await Product.findById(req.params.id).select({title:1, _id:0,price:1});
        if(!readOne){
            res.status(404).json({message: "Not mash the product Id"})
        }
        res.status(200).json(readOne);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});




app.use((req, res) => {
    res.status(404).json({
        message: "Page is not create"
    })
});
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Server error"
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running http://127.0.0.1:${PORT}`);
    connectingDB();
});