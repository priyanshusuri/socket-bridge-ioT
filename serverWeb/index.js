var express = require("express");
var fs = require('fs');
var app = express();
var port = process.env.PORT ||3000;
var io = require('socket.io').listen(app.listen(port));

var socketID = null;
 
app.get("/", function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
    });
});   

app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        socketID = null;
        res.writeHead(200);
        res.end('Resetado');        
    }
    res.writeHead(404);
    res.end('File not found');     
});   


 
// Iniciando Socket Server
io.on('connection', function(socket){
    
    socket.on('ping', function(dados){
        socketID = {'sessionid':dados};
        socket.emit('pong', socketID);
    });     

    socket.on('setIdServer', function(socket){
        //Gravar em arquivo a socketIdClient da master na variavel socketID
        socketID = {'sessionid':socket.socketIdClient};            
    });   

    socket.on('ligar', function(visitas){
        socket.broadcast.emit('ligar', socketID);
    });
    
    //Agum navegador entrou no socket?
    //Emite o lbolSocketidClient para avisar que a instancia sera um client
    if(socketID)
        socket.emit('isServer', {'sessionid':socketID});
    });
            
console.log("Listening on port " + port);



