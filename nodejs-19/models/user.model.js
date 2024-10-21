const { v4: uuidv4 } = require('uuid');

// Users array
let users = [
    { id: uuidv4(), name: 'saurav', email: 'saurav@gmail.com' },
    { id: uuidv4(), name: 'sarkar', email: 'sarkar@gmail.com' },
    { id: uuidv4(), name: 'virat', email: 'virat@gmail.com' }
];

module.exports = users;

