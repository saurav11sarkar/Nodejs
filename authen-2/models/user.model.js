const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is requried"],
        trim: true,
        uppercase: true
    },
    email: {
        type: String,
        required: [true, "Name is email"],
        trim: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/.test(v);
            },
            message: (props) => `${props.value} is not a email`
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Name is password"],
        trim: true
    },
    createOn: {
        type: Date,
        default: Date.now
    }
});

exports.AuthUser = mongoose.model("AuthUser", userSchema);