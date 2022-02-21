const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const JWTSecret = "kuririn";

function auth(req, res, next){

    const authToken = req.headers['authorization'];
    if(authToken != undefined){

        const bearer = authToken.split(" ");
        var token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data)=>{
            if(err){
                res.status(401);
                res.json({err: "Token inválido"})
            }else{

                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                console.log(data);
                next();
            }
        });

    }else{
        res.status(401);
        res.json({err: "Token invalido."})
    }
}

var DB = {
    games: [
        {
            id: 1,
            title: "God Of War",
            ano: 2019,
            preco: 200
        },

        {
            id: 34,
            title: "Lost Ark",
            ano: 2022,
            preco: 0
        },
        {
            id: 101,
            title: "Horizon Zero Down",
            ano: 2018,
            preco: 150
        }

    ],

    users: [
        {
            id: 1,
            nome: "Goku",
            email: "sayajin@mail.com",
            senha: "dragonballs"
        },
        {
            id: 2,
            nome: "Naruto",
            email: "kyuubi@mail.com",
            senha: "sasuke"
        }
    ]
}

app.get("/games",auth,(req, res)=>{
    res.statusCode = 200;
    res.json({games: DB.games, user: req.loggedUser});
});

app.get("/game/:id",auth, (req,res) => {

    if(isNaN(req.params.id)){
        //res.send("Isso não é um número!");
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);

        let game = DB.games.find(g => g.id == id);

        if(game == undefined){
            res.sendStatus(404);
        }else{
            res.statusCode = 200;
            res.json(game);
        }

    }
    

    res.json(DB.games.id == id);
});

app.post("/game",auth,(req , res) => {
    
    var {title, ano, preco} = req.body;
    DB.games.push({
        id: 24,
        title,
        ano,
        preco
    });
    
    res.statusCode = 200;
});

app.delete("/game/:id", auth, (req,res) => {

    if(isNaN(req.params.id)){
        //res.send("Isso não é um número!");
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);

        let index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }


    }
});

app.put("/game/:id", (req , res) => {

    if(isNaN(req.params.id)){
        //res.send("Isso não é um número!");
        res.sendStatus(400);
    }else{

        let id = parseInt(req.params.id);

        let game = DB.games.findIndex(g => g.id == id);
        
        var {title, ano, preco} = game;

        if(title != undefined){
            game.preco = preco;
        }

        if(ano != undefined){
            game.ano = ano;
        }
        
        if(preco != undefined){
            game.preco = ano;
        }

        res.sendStatus(200);

    }

});

app.post("/auth", (req,res) =>{

    var{email, senha} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email);

        if(user != undefined){

            if(user.senha == senha){

                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'48h'},(err, token) =>{
                    if(err){
                        res.status(400);
                        res.json({err: "Falha interna."});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });


            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas."})
            }

        }else{
            res.status(404);
            res.json({err: "E-mail enviado não existe na base de dados."});
        }

    }else{
        res.status(400);
        res.json({err: "E-mail enviado é inválido."});
    }

});

app.listen(45678, ()=>{
    console.log("API RODANDO...");
})