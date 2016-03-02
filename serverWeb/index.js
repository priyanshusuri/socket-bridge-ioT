var express = require("express");
var fs = require('fs');
var app = express();
var port = process.env.PORT ||3000;
var io = require('socket.io').listen(app.listen(port));
var http = require('http');

var socketID = null;
 
app.get("/", function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
    });
});   

app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        fs.unlinkSync(__dirname + '/configuration.json');
        res.writeHead(200);
        res.end('Resetado ');        
    }
    res.writeHead(404);
    res.end('File not found');     
});   

app.get("/:id/:id", function(req, res){
    fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
    if (err) {
       res.writeHead(404);
       res.end('not found');
    }
    res.writeHead(200);
    res.end(data);        
  });  
}); 

 
// Iniciando Socket Server
io.on('connection', function(socket){
   
    socket.on('ping', function(dados){
        fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            socket.emit('pong', JSON.parse(data));
        });
        
        http.get({
            hostname: 'localhost',
            port: port,
            path: '/10/10',
            agent: false  // create a new agent just for this one request
            }, (res) => {
                console.log(res);
            // Do stuff with response
        })
    });   
     

    socket.on('setIdServer', function(socket){
        fs.writeFile(__dirname +'/configuration.json', JSON.stringify(socket), function (err) {
            if (err) return console.log(err);
        });            
    });   

    socket.on('ligar', function(visitas){
        fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            socket.broadcast.emit('ligar',  JSON.parse(data));
        });            
    });   
 
     //Agum navegador entrou no socket?
    fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
        if (!err) {
            socket.emit('isServer',  JSON.parse(data));
        }
    });

 });

console.log('Running port ' + port)