var http = require("http");

http.createServer(function(requisicao, resposta){

    resposta.end("<h1>Bem vindo ao servidor!</h1><br><h4>David Rodrigues</h4>")

}).listen(8181);

console.log("Meu servidor está rodando!")