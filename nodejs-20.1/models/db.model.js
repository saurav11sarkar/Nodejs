const mongoose = require('mongoose');
const dev = require('./confige.model');

mongoose.connect(dev.uri.db).then(() => {
    console.log("Mongobd connect")
}).catch((err) => console.log(err))