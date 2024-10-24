const express = require('express');
const cors = require('cors');
const router = require('./router/user.router');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./configs/user.config');
require("./configs/possport.config");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");

// session
app.set("trust proxy", 1);
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.DB_URL,
            collectionName: "sessions"
        }),
        cookie: { 
            secure: process.env.NODE_ENV === 'production'
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

// router
app.use(router);

// error handler middleware
app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: "Server error" });
});

module.exports = app;
