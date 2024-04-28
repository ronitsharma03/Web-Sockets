const http = require('http');
const express = require('express');
const path = require("path");
// requiring the server from socket io
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
// create instance of the required Server 
// io -> input output a instance of Server that takes our created http server
//  I initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server);

// Socketio connection
// socket -> user on the client
// every socket (client) has an id
io.on("connection", (socket) => {
    socket.on('User-Message', (message)=>{
        io.emit('message', message);
    });
});


app.use(express.static(path.resolve("./public")));


app.get('/', (req, res) => {
    return res.sendFile("/public/index.html");
})

server.listen(3000, ()=> console.log(`Server is running at PORT:3000`));