var database = require('./database');

/* INSERT
var dados = [
    {
        nome: "Lost Ark",
        preco: 0.0
    },
    {
        nome: "Pokemon Diamond and Pearl",
        preco: 200.0
    },
    {
        nome: "Call Of Duty",
        preco: 70.0
    },
    {
        nome: "Sea of Thieves",
        preco: 50.0
    }
]

var query = database.insert(dados).into('games').then(data => {
    console.log(data);
}).catch(err =>{
    console.log(err);
});
*/

/* SELECT simples
database.select(["id","preco"]).table("games").then(data => {
    console.log(data);
}).catch(err =>{
    console.log(err);
});
*/

/* NESTED QUERIES
database.insert({nome: "Dragons Dogma", preco: 100.00}).into('games').then(data => {
    database.select(["id","preco"]).table("games").then(data => {
        console.log(data);
    }).catch(err =>{
        console.log(err);
    });
}).catch(err =>{
    console.log(err);
});
*/

/* WHERE
database.select()
    .where({nome: "Dragons Dogma"})
    .whereRaw("nome = 'Dragons Dogma' OR preco < 50")
    .table("games").then(data =>{
        console.log(data);
    }).catch(err =>{
        console.log(err);
    })
*/

/*
database.raw("SELECT * FROM games").then(data => {
    console.log(data);
}).catch(err =>{
    console.log(err);
});
*/

/* DELETE
database.where({id: 3}).delete().table("games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
*/
/* UPDATE
database.where({id: 5}).update({preco: 70}).table("games").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
*/

/* ORDER BY
database.select().table("games").orderBy("nome", "asc").then(data =>{
        console.log(data);
}).catch(err => {
    console.log(err);
}) //desc //asc 
*/

/* INSERT
database.insert({
    nome: "CD Projekt",
    gameid: 1
}).table("estudios").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
}) */

/*INNER JOIN 1x1 

database.
    select(["games.id", "estudios.id as estudio_id", "games.nome as games_nome", "estudios.nome as estudio_nome"]).
    table("games").
    innerJoin("estudios","estudios.gameid", "games.id").
    where("games.id", 1).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
}); */

/*JOIN 1xM 

database.
select(["games.id", "estudios.id as estudio_id", "games.nome as games_nome", "estudios.nome as estudio_nome"]).
table("games").
innerJoin("estudios","games.estudiosid", "games.id").
where("estudios.id", 1).then(data => {
    var estudiosGamesArray = data;

    var game = {
        id:  0,
        nome: "",
        estudios: []
    }

    game.id = data[0].id;
    game.nome = data[0].nome;

    data.forEach(estudio => {
        game.estudios.push({nome: estudio.estudio_nome});
    });

    console.log(game);
}).catch(err => {
    console.log(err);
});

*/
/* Relacionamento MxM
database.select([
    "games.nome as game",
    "estudios.nome as estudio",
    "games.preco as preco"
    ]).table("games_estudios").innerJoin("games", "games.id", "games_estudios.game_id")
    .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id").where("games.id",4).then(data =>{
    console.table(data);
}).catch(err =>{
    console.log(err);
}); 

database.select([
    "games.nome as game",
    "estudios.nome as estudio",
    "games.preco as preco"
    ]).table("games_estudios").innerJoin("games", "games.id", "games_estudios.game_id")
    .innerJoin("estudios", "estudios.id", "games_estudios.estudio_id").then(data =>{
    console.table(data);
}).catch(err =>{
    console.log(err);
}); */

async function testeTransacao(){

    try {
        await database.transaction(async trans =>{
           await database.insert({nome: "Riot"}).table("estudios");
           await database.insert({nome: "League Of Legends", preco: 0.00}).table("games");
           await database.insert({nome: "Nitendo"}).table("estudios");
           await database.insert({nome: "Zelda: Breath of The Wild", preco: 200.00}).table("games");
        })
    } catch (error) {
        console.log(err);
    }

}

testeTransacao();