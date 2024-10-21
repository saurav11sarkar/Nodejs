const mongoose = require('mongoose');
const dev = require('./confige.model');

const dbURL = dev.db.url;

mongoose.connect(dbURL).then(() => {
    console.log(`Mongodb is connect`)
}).catch((err) => {
    console.log(err)
    process.exit(1)
})