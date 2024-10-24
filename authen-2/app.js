const { AuthUser } = require('./models/user.model');
const router = require('express').Router();
const bcrypt = require('bcrypt');

// Welcome route
router.get("/", (req, res) => {
    res.status(200).send("Welcome to Auth User");
});

// Get all users
router.get("/user", async (req, res) => {
    try {
        const allUsers = await AuthUser.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register new user
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new AuthUser({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthUser.findOne({ email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.status(200).json({ status: "Valid User", message: user.name });
            } else {
                res.status(401).json({ status: "Invalid Password" });
            }
        } else {
            res.status(404).json({ status: "User Not Found" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
