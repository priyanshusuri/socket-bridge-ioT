// Server basicao
var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(process.env.PORT ||3000, function() {
  console.log("Servidor rodando!" + process.env.PORT ||3000);
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

// Iniciando Socket
io.on('connection', function(socket){

    socket.on('setIdServer', function(socket){
        //Gravar em arquivo a sessionId master
        fs.writeFile(__dirname +'/configuration.json', socket.socketIdClient, function (err) {
            if (err) return console.log(err);
        });            
    });   

    socket.on('ligar', function(visitas){
         //Recupera em arquivo a sessionId master
        fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        
        socket.broadcast.emit('ligar', {'lstrgSocketServer':data});
        });        
        
    });

    socket.on('Erase', function(visitas){
        fs.unlinkSync(__dirname + '/configuration.json')
    });

    
    //Agum navegador entrou no socket?
    //Emite o lbolSocketidClient
    fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
    
    if(data)
        socket.emit('lbolSocketidClient', {'lstrgSocketServer':data});
    });        
   
});
