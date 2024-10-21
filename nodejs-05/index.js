const RandomFruitsName = require('random-fruits-name');
const moviesNames = require('movies-names');
const http = require('http');
console.log(RandomFruitsName());

const port = 3000;

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type':'application/json'});
    const movie = moviesNames.random(10);
    res.write(JSON.stringify(movie));
    res.end();
});

server.listen(port, ()=>{
    console.log('server is running',port)
});