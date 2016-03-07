/*
Script em Js NodeJs Adaptado por Juscilan Moreto
Responsavel por implementar rotas e socket.io server
2016 © - juscilan.com‎
*/

var port = process.env.PORT ||3000;
var express = require("express");
var fs = require('fs');
var app = express();
var io = require('socket.io').listen(app.listen(port));
var http = require('http');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sessionID;

//Servir o html estático 
app.get("/", function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
    });
});   

//Post para gravar a session ID na variavel
app.post("/", function(req, res){
   
    sessionID = JSON.stringify(req.body);
    res.writeHead(200);
    res.end('Set ok');     

});

// GET /:id Resetar a Variavel 
app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        sessionID = JSON.stringify({"sessionid":null});
        res.writeHead(200);
        res.end('Reset ok');        
    }
    else{
        res.writeHead(404);
        res.end('File not found');           
    }
  
});   

// Iniciando Socket Server
io.on('connection', function(socket){
   
    // Ping-pong utilizado para manter a conexão com o PaaS
    socket.on('ping', function(data){
        sessionID = JSON.stringify(data);
        socket.emit('pong', {});
    });   
    
    // Executa a ação 
    socket.on('ExecAction', function(data){
        console.log(JSON.stringify(data));
        socket.broadcast.emit('ExecActionRes',data);            
    });   

    //Agum navegador entrou no socket? Envia page load
    if(sessionID){
       socket.emit('isServer', JSON.parse(sessionID));
    }else{
       sessionID = JSON.stringify({"sessionid":null});
       socket.emit('isServer',   sessionID);
    }
    
    
 });
console.log('Running port ' + port )