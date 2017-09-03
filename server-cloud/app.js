const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
const io = require('socket.io').listen(app.listen(port));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());
let sessionState;

// Servir o html estático
app.get('/', (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    res.writeHead(200);
    res.end(data);
  });
});

// Post para gravar a session ID na variavel
app.post('/', (req, res) => {
  sessionState = JSON.stringify(req.body);
  res.writeHead(200);
  res.end('Set ok');
});

// GET /:id Resetar a Variavel sessionState
app.get('/:id', (req, res) => {
  if (req.params.id === 'reset') {
    sessionState = JSON.stringify({});
    res.writeHead(200);
    res.end('Reset ok');
  } else {
    res.writeHead(404);
    res.end('File not found');
  }
});

// Iniciando Socket Server
io.on('connection', (socket) => {
  // Manter estado das acoes
  socket.on('sendreq', (data) => {
    sessionState = JSON.stringify(data);
  });

  // Executa a ação
  socket.on('ExecAction', (data) => {
    sessionState = JSON.stringify(data);
    socket.broadcast.emit('ExecActionRes', data);
  });

  // Agum navegador entrou no socket? Envia page load
  if (sessionState) {
    socket.emit('isServer', JSON.parse(sessionState));
  } else {
    sessionState = JSON.stringify({});
    socket.emit('isServer', sessionState);
  }
});

console.log(`Running port ${port}`);
