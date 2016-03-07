/*
Script NodeJs Adaptado por Juscilan Moreto
Responsavel por implementar rotas e socket.io server
2016 © - juscilan.com‎
*/

var port = process.env.PORT || 3000;
var express = require("express");
var fs = require('fs');
var app = express();
var io = require('socket.io').listen(app.listen(port));
var http = require('http');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sessionState;

//Servir o html estático 
app.get("/", function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
    });
});   

//Post para gravar a session ID na variavel
app.post("/", function(req, res){
   
    sessionState = JSON.stringify(req.body);
    res.writeHead(200);
    res.end('Set ok');     

});

// GET /:id Resetar a Variavel sessionState
app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        sessionState = JSON.stringify({});
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
   
    // Manter estado das acoes    
    socket.on('sendreq', function(data){
        sessionState = JSON.stringify(data);
    });   
    
    // Executa a ação 
    socket.on('ExecAction', function(data){
        sessionState = JSON.stringify(data);
        socket.broadcast.emit('ExecActionRes',data);            
    });   

    //Agum navegador entrou no socket? Envia page load
    if(sessionState){
       socket.emit('isServer', JSON.parse(sessionState));
    }else{
       sessionState = JSON.stringify({});
       socket.emit('isServer',   sessionState);
    }
    
    
 });
console.log('Running port ' + port )