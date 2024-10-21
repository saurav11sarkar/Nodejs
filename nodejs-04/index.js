const http = require('http');

const port = 3000;
const hostname = '127.0.0.1'

const myServer = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    res.write("<h1>Hello world</h1>");
    res.write("<h1>Hello world</h1>");
    res.end()
})

myServer.listen(port, () => {
    console.log(`Server is runnig http://${hostname}:${port}`);
});