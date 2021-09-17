const express = require("express");
const app = express();
const connection = require('./database/database')
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const Article = require('./articles/Article')
const Category = require('./categories/Category')

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//static 
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get("/",(req, res)=>{

    res.render("index")
})

//Database

connection
        .authenticate()
        .then(() =>{
            console.log("Conectado ao banco de dados!")
        }).catch((error) =>{
            console.log(error)
        });

app.use('/', categoriesController);
app.use('/', articlesController);

app.listen(8080, ()=>{
    console.log("O servidor está rodando!")
})