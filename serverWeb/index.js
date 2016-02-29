// Server basicao
var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(process.env.PORT ||3000, function() {
  console.log("Servidor rodando! porta: " + process.env.PORT ||3000);
});

function index(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
  });
};

/*
var io = require('socket.io')(app, {
  path: '/socket.io-client'
});*/
//io.set('transports', ['websocket']);
/*
io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);
*/

var dadosId;

// Iniciando Socket
io.on('connection', function(socket){
    
    socket.on('ping-um', function(data){
        
        if(dadosId){
            sleep(2000);
            socket.emit('pong-um', dadosId);
            return;
        }
        
        if(data.sessionid)
            dadosId = data;
                
        //sleep(2000);
        socket.emit('pong-um', data);
    });
    
    socket.on('ligar', function(visitas){
        socket.broadcast.emit('ligar', dadosId);
    }); 
    
    socket.on('erase', function(visitas){
        dadosId = null;
    });    

    socket.on('ping-id', function(){
        console.log(dadosId);
        socket.emit('pong-id', dadosId);
    }); 
    
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};
