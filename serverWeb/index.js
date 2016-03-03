var express = require("express");
var fs = require('fs');
var app = express();
var port = process.env.PORT ||3000;
var io = require('socket.io').listen(app.listen(port));
var http = require('http');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
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

app.get("/:id", function(req, res){
    if(req.params.id == 'reset'){
        process.env['SESSIONID'] =JSON.stringify({"sessionid":null});
        //fs.unlinkSync(__dirname + '/_config.dat');
        res.writeHead(200);
        res.end('Reset ok');        
    }
    else{
        res.writeHead(404);
        res.end('File not found');           
    }
  
});   

app.get("/:id/:id", function(req, res){
     
    res.writeHead(200);
    
    if(process.env['SESSIONID']){
        res.end(JSON.stringify(process.env['SESSIONID']) + ' Porta: ' + port );        
    }else
        res.end('SESSIONID not found!');
    
});  

 
// Iniciando Socket Server
io.on('connection', function(socket){
   
    socket.on('ping', function(dados){
        socket.emit('pong', JSON.parse(process.env['SESSIONID']));
        /*
        http.get({
            hostname: 'localhost',
            port: port,
            path: '/10/10',
            agent: false  // create a new agent just for this one request
            }, (res) => {
                console.log(res);
            // Do stuff with response
        })
        */
    });   
     
    socket.on('ligar', function(visitas){
        socket.broadcast.emit('ligar',  JSON.parse(process.env['SESSIONID']));            
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