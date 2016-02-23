//Este server preferencialmente deverá rodar no raspberry pi
var express = require('express');
var app = express();

var five = require("johnny-five");
var board = new five.Board();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', function(req, res, next) {
  /*
  var relay = new five.Relay(10);

   relay.on();
  
   //relay.off();
  
    this.repl.inject({
        relay: relay
    });  
    */  
    console.log('implementar o janny-five');
    res.status(200).json({ acendeu: true });
});

console.log('Rodando na porta local: ' + '3012');
app.listen(3012);