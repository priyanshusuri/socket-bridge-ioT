/*
Script NodeJs Adaptado por Juscilan Moreto
Responsavel por se comunicar com um dispositivo embarcado
Arduino / Raspberry por exemplo
2016 © - juscilan.com‎
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Descomentar após instalar o arduino
/*
var five = require("johnny-five");
var board = new five.Board();
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS config.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/', function(req, res, next) {

//Descomentar após instalar o arduino

/*
    try {

        if(req.body.ledon || req.body.ledoff){
            var led = new five.Led(13);
            if(req.body.ledon)
                led.on();
            if(req.body.ledoff)
                led.off(); 
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
*/
    res.status(200).json({ exec: true });
    console.log(JSON.stringify(req.body));

});

console.log('Rodando na porta local: ' + '3012');
app.listen(3012);