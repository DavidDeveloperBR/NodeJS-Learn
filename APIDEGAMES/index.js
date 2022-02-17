const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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

    ]
}

app.get("/games",(req, res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req,res) => {

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

app.post("/game",(req , res) => {
    
    var {title, ano, preco} = req.body;
    DB.games.push({
        id: 24,
        title,
        ano,
        preco
    });
    
    res.statusCode = 200;
});

app.delete("/game/:id", (req,res) => {

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

app.put("/game/:id", (req,res) =>{

    if(isNaN(req.params.id)){
        //res.send("Isso não é um número!");
        res.sendStatus(400);
    }else{

        let id = parseInt(req.params.id);

        let game = DB.games.findIndex(g => g.id == id);
        
        var {title, ano, preco} = req.body;

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

})

app.listen(45678, ()=>{
    console.log("API RODANDO...");
})