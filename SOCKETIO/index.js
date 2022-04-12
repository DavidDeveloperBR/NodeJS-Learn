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

    socket.on("boasvindas", (data) =>{
        console.log("EXECUTANDO EVENTO DE BOAS VINDAS");
        console.log(data);
    });

    socket.on("palavra", (data) =>{
        console.log(data);
        socket.emit("resultado", data+" Rdrigues do Nascimento")
    });
});


http.listen(3000, () =>{
    console.log("Servidor online!");
})
