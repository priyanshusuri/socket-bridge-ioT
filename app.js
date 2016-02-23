
var http = require('http');

http.createServer(function(req, res){
   res.end('testing anyway..');

}).listen(process.env.PORT ||3000);