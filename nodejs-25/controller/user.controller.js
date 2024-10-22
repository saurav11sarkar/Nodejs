const users = []

exports.getUser = (req, res) => {
    res.status(200).json(users);
}

exports.postvalidation = async (req, res) => {
    try {
        const { name, email, password, dob } = req.body;
        const dateofbird = new Date(dob).toISOString();
        const newUser = { name, email, password, dateofbird };
        users.push(newUser)
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = { email, password };
        if (email === 'saurav@gmail.com' && password === '123456') {
            return res.status(200).json(newUser);
        } else {
            return res.status(400).json({ message: "Email and password donot mass" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}