/*
Este server preferencialmente deverá rodar no raspberry pi
Ele fará a execucao de acoes no embarcado.
*/

var express = require('express');
var app = express();


var five = require("johnny-five");
var board = new five.Board();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {

    var ledVermelho = new five.Led(10);
    ledVermelho.on();
     res.status(200).json({ acendeu: true });
    console.log('implementar o janny-five' + ' Hora ' + Date());

});

app.get('/:id', function(req, res, next) {

    var ledVermelho = new five.Led(10);
    ledVermelho.off();

    res.status(200).json({ acendeu: true });
    console.log('implementar o janny-five' + ' Hora ' + Date());

});

console.log('Rodando na porta local: ' + '3012');
app.listen(3012);