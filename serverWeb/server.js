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

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Servir o html estático 
app.get("/", function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
    });
});   

app.post("/", function(req, res){
   
    process.env['SESSIONID'] = JSON.stringify(req.body);
    res.writeHead(200);
    res.end('Set ok');     

});

// GET /:id setar a Variavel de ambiente SESSIONID
app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        process.env['SESSIONID'] =JSON.stringify({"sessionid":null});
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
    socket.on('ping', function(){
        socket.emit('pong', {});
    });   
    
    // Executa a ação 
    socket.on('ExecAction', function(data){
        data.socketid = JSON.parse(process.env['SESSIONID']);
        socket.broadcast.emit('ExecActionBack',  data);            
    });   

    //Agum navegador entrou no socket? Envia page load
    if(process.env['SESSIONID']){
       socket.emit('isServer',  JSON.parse(process.env['SESSIONID'])); 
    }else{
       process.env['SESSIONID'] = JSON.stringify({"sessionid":null});
       socket.emit('isServer',   process.env['SESSIONID']); 
    }
    
    
 });
console.log('Running port ' + port )