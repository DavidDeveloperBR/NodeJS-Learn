const express = require('express');
const app = express();
const connection = require('./database/database')
const Perguntas = require('./database/Perguntas')

//Database
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com o banco de dados.')
    })
    .catch((msgErro)=>{
        console.log(msgErro)
    })



//Estou dizendo para o Express utilizar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//"Body-parser"
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rotas
app.get("/",(req, res)=>{

    Perguntas.findAll({raw: true}).then(perguntas=>{
        res.render("index",{
            perguntas: perguntas
        })
        
    })


});

app.get("/perguntar",(req, res)=>{
    res.render("perguntar", {

    });
});

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Perguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/')
    })
});

app.listen(8080, ()=>{
    console.log("App rodando.")
});