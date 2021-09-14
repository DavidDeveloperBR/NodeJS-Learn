const express = require('express');
const app = express();
const connection = require('./database/database')
const Perguntas = require('./database/Perguntas')
const Respostas = require('./database/Respostas')

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

    Perguntas.findAll({raw: true, order:[
        ['id','DESC'] //ASC = crescente e DESC = decrescente
    ]}).then(perguntas=>{
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

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;

    Perguntas.findOne({
        where:{id: id},
    }).then(pergunta => {
        if(pergunta != undefined){//pergunta encontrada
            Respostas.findAll({
                where:{
                    perguntaId: pergunta.id
                },
                order:[
                    ['id', 'DESC']
                ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }else{//não econtrada
            res.redirect("/")
        }
    });

})

app.post("/responder", (req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Respostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

app.listen(8080, ()=>{
    console.log("App rodando.")
});