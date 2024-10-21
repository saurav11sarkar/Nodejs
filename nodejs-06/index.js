const http = require('http');
const fs = require('fs');
const PORT = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./views/index.html', (err, data) => {
            res.writeHead(200, { "Content-Type": 'text/html' })
            res.write(data)
            res.end()
        })
    }
    else if (req.url === '/about') {
        fs.readFile('./views/about.html', (err, data) => {
            res.writeHead(200, { "Content-Type": 'text/html' })
            res.write(data)
            res.end()
        })
    }
    else if(req.url === '/contact'){
        fs.readFile('./views/contact.html',(err,data)=>{
            res.writeHead(200,{"Contact-Type":'text/html'});
            res.write(data)
            res.end()
        })
    }
    else{
        fs.readFile('./views/error.html', (err,data)=>{
            res.writeHead(404, {'Content-Type':'text/html'});
            res.write(data);
            res.end()
        })
    }
});

server.listen(PORT, hostname, () => {
    console.log(`server is running http://${hostname}:${PORT}`);
});