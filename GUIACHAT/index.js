var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get("", (req, res) => {
    res.render('index');
});


io.on('connection', (socket) =>{

    socket.on("disconnect", ()=>{
        console.log("user "+socket.id+" disconnected");
    });

    socket.on('msg', (data) =>{
        console.log(data);
        //socket.broadcast.emit('showMsg', data); Envia para todos mas menos para mim
        io.emit('showMsg', data);
    });

});


http.listen(3000, () =>{
    console.log("Servidor online!");
})
