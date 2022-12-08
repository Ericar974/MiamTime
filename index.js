const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index.html');
});

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/app/css/style.css');
});

app.get('/js', (req, res) => {
    res.sendFile(__dirname + '/app/javascript/index.js');
});

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/app/javascript/socket.js');
});

app.get('/map', (req, res) => {
    res.sendFile(__dirname + '/app/javascript/map.js');
});

io.on('connection', (socket) => {
    //socket.broadcast.emit('hi');
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

server.listen(3000, () => {
    console.log('listening on *:3000');
});