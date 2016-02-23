// Server basicao
var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(3000, function() {
  console.log("Servidor rodando!");
});

function index(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	  res.writeHead(200);
    res.end(data);
  });
};

// Iniciando Socket
var lstrgSocketidClient ='';

// Evento connection ocorre quando entra um novo usuário.
io.on('connection', function(socket){

    socket.on('setIdServer', function(socket){
        lstrgSocketidClient = socket.socketIdClient;
    });   

    socket.on('ligar', function(visitas){
        socket.broadcast.emit('ligar', {'lstrgSocketServer':lstrgSocketidClient});
    });
    
    socket.emit('lbolSocketidClient', {'lstrgSocketServer':lstrgSocketidClient});    
   
});

