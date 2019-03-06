var express = require('express');
var socket = require('socket.io')

//app setup
var app = express();
var server = app.listen(4000, () => {
    console.log('Listening to requests on port 4000');
})

//static files
app.use(express.static('public'));


//socket setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log(`socket connection established on following server ${socket.id}`)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})