//imports
var http = require('http');
var express = require('express');
var socket = require('socket.io');

//server setup
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 4000;

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

//connection establishing
io.on('connection', (socket) => {
    console.log(`socket connection established on following server ${socket.id}`)

    //getting data from client
    socket.on('chat', (data) => {
        //sending data to all clients
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        //broadcasting data to all clients
        socket.broadcast.emit('typing', data)
    })
});

server.listen(port, () => {
    console.log(`Listening following port ${port}`);
});