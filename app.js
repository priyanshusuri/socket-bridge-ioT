const http = require('http');
//const port = 1225;//process.env.PORT;
const port = process.env.PORT || 3003;
console.log(port);
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
  
}).listen(port);