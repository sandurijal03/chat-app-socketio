const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname));

const port = process.env.PORT || 3001;
http.listen(port, () => console.log('listning  to server on port ', port));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket io

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});
