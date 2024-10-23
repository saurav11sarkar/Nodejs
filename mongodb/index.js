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
        required: true,
        minlength: [3, "mini length of the product title should be 3"],
        trim: true,
        // enum:{
        //     values:["iphone", "sumsung"],
        //     message:"{VALUE} is not supportes"
        // }
    },
    price: {
        type: Number,
        required: true,
        maxlength: [5, "max length should be 5"],
        validate: {
            validator: (v) => {
                return v.toString().length === 4
            },
            message: (props) => `${props.value} is not price`
        },
    },
    phone: {
        type: String,
        required: [true, "Phone number is requried"],
        validate:{
            validator: (v)=>{
                return /^(01[3-9]{1}[0-9]{2})-?([0-9]{6})$/.test(v);
            },
            message: (props) => `${props.value} is not a phone number`
        }
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
const connectingDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test")
        console.log("Mongodb connected")
    } catch (error) {
        console.log(error)
    }
};

app.get("/", (req, res) => {
    res.status(200).send("Wellcome to server")
});

app.post("/product", async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            phone: req.body.phone
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.get("/product", async (req, res) => {
    try {
        const price = req.query.price;
        const name = req.query.name;
        let readProduct;

        if (price && name) {
            readProduct = await Product.find({ $and: [{ price: { $eq: price } }, { title: { $eq: name } }] });
        }
        else {
            readProduct = await Product.find().sort({ price: -1 });
        }

        if (!readProduct) {
            res.status(404).json({ message: "This Product is emapty" })
        }

        res.status(200).json(readProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const readOne = await Product.findById(req.params.id).select({ title: 1, _id: 0, price: 1 , phone: 1});
        if (!readOne) {
            res.status(404).json({ message: "Not mash the product Id" })
        }
        res.status(200).json(readOne);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.delete("/product/:id", async (req, res) => {
    try {
        const deleteOne = await Product.deleteOne({ _id: req.params.id });
        if (!deleteOne) {
            res.status(404).json({ message: "Not mash the product Id" })
        }
        res.status(200).json({ message: "Delete is successfull" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.put("/product/:id", async (req, res) => {
    try {
        // ----1 way very better-----
        const updateDate = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            phone: req.body.phone
        }
        const updateproduct = await Product.findByIdAndUpdate(req.params.id, updateDate, { new: true });
        if (!updateproduct) {
            res.status(404).json({ message: "Not mash the id" })
        }
        res.status(201).json(updateproduct);

        // ------ 2 way but one problam all name change ----
        // const updateDate = await Product.findById(req.params.id);
        // updateDate.title = req.body.title;
        // updateDate.price = req.body.price;
        // updateDate.description = req.body.description;
        // if (!updateDate) {
        //     res.status(404).json({ message: "Not mash the id" })
        // }
        // await updateDate.save()
        // res.status(201).json(updateDate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


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
app.listen(PORT, async () => {
    console.log(`server is running http://127.0.0.1:${PORT}`);
    await connectingDB();
});
