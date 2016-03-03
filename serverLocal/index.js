var express = require('express');
var app = express();
var five = require("johnny-five");
var board = new five.Board();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {

    //var ledVermelho = new five.Led(10);
    //ledVermelho.on();
    res.status(200).json({ acendeu: true });
    
    var relay = new five.Relay(7);

  // Control the relay in real time
  // from the REPL by typing commands, eg.
  //
   relay.on();
  //
  // relay.off();
  //
  /*this.repl.inject({
    relay: relay
  });*/
    
    console.log('implementar o janny-five' + ' Hora ' + Date());

});

app.get('/:id', function(req, res, next) {

    var relay = new five.Relay(7);

  // Control the relay in real time
  // from the REPL by typing commands, eg.
  //
   relay.off();
   
   /* var ledVermelho = new five.Led(10);
    ledVermelho.off();*/

    res.status(200).json({ acendeu: true });
    console.log('implementar o janny-five' + ' Hora ' + Date());

});


console.log('Rodando na porta local: ' + '3012');
app.listen(3012);