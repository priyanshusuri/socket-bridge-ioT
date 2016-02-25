// Server basicao
var app = require('http').createServer(index)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
;
app.listen(process.env.PORT ||3000, function() {
  console.log("Servidor rodando!" + process.env.PORT);
});

function index(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
	res.writeHead(200);
    res.end(data);
  });
};

//Global manter o lstrgSocketidClient connection master
var lstrgSocketidClient ='';

// Iniciando Socket
io.on('connection', function(socket){

    socket.on('setIdServer', function(socket){
        if (!lstrgSocketidClient){
            fs.writeFile(__dirname +'/configuration.json', socket.socketIdClient, function (err) {
            if (err) return console.log(err);
            });            
        }
        console.log('Gravou ' + __dirname +'/configuration.json');
        lstrgSocketidClient = socket.socketIdClient;
    });   

    socket.on('ligar', function(visitas){
        fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        
        console.log(data);
        lstrgSocketidClient = data;
        socket.broadcast.emit('ligar', {'lstrgSocketServer':lstrgSocketidClient});
        });        
        
    });

    socket.on('Erase', function(visitas){
        fs.unlinkSync(__dirname + '/configuration.json')
    });

    
    //socket.on('lbolSocketidClient', function(visitas){
    fs.readFile(__dirname + '/configuration.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
    
    if(data)
        socket.emit('lbolSocketidClient', {'lstrgSocketServer':data});
    });        
        
    //});    
    
    //socket.emit('lbolSocketidClient', {'lstrgSocketServer':lstrgSocketidClient});    
   
});
