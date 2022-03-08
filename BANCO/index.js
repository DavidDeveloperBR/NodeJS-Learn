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

database.insert({
    nome: "CD Projekt",
    gameid: 1
}).table("estudios").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})