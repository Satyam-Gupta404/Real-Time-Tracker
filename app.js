const express = require('express');
const app = express();
const path=require('path');

const http=require('http');

const socketio=require('socket.io');

const server=http.createServer(app);

const io=socketio(server);

io.on("connection",function(socket){
  socket.on("send-location",function(data){
    io.emit("recieve-location",{id:socket.id, ...data}); //user connected
  });
  socket.on("user-dissconnect",function(){
    io.emit("user-disconnect",socket.id);  //user disconnect
  })
});

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(3000);