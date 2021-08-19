const express = require('express'); //Importando o Express
const app = express(); //Inicializando

app.get("/",function(req, res){
    res.send("Bem vindo David Rodrigues!") //Não envia multiplas respostas
})

app.get("/blog/:artigo?", function(req,res){

    var artigo = req.params.artigo
    if(artigo){
        res.send(`Artigo: ${artigo}`)
    }else{
        res.send("Site em manutenção.")
    }
    
})

app.get("/canal/youtube", function(req,res){

    var canal = req.query["canal"];
    if(canal){
        res.send(canal)
    }else{
        res.send("Nenhum canal enviado.")
    }

})

app.get("/ola/:nome/:empresa", function(req,res){
    //REQ => DADOS ENVIADOS PELO USUÁRIO
    //RES => RESPOSTA ENVIADA PELO USUÁRIO
    var nome = req.params.nome
    var empresa = req.params.empresa
    res.send(`<h1>Oi ${nome}</h1></br><h2>Empresa: ${empresa}</h2>`)
})

app.listen(4000,function(erro){
    if(erro){
        console.log("Ocorreu um erro!")
    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})