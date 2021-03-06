const express = require("express");
const app = express();
const connection = require('./database/database');
const session = require('express-session');
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./users/UsersController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User');

//Session
app.use(session({
    secret: "chewie",
    cookie: {
        maxAge: 30000
    },
    resave: true,
    saveUninitialized: true
}))


//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//static 
app.use(express.static('public'))

app.set('view engine', 'ejs')

//Manipular Session
// app.get('/session',(req,res)=>{
//     req.session.treinamento = "Aplicativo JavaScript David",
//     req.session.ano = 2021,
//     req.session.email = 'david@mail.com',
//     req.session.user = {
//         id: 10,
//         username: 'David Rodrigues'
//     }

//     res.send("Sessão gerada!");
// });

// app.get('/leitura',(req,res)=>{
//     res.json({
//         treinamento: req.session.treinamento,
//         ano: req.session.ano,
//         email: req.session.email,
//         user: req.session.user
//     })

// });


app.get("/",(req, res)=>{

    Article.findAll({
        order: [
            ['id','DESC']
        ], 
        limit: 4
    }).then(articles =>{

        Category.findAll().then(categories => {
            res.render('index',{articles: articles , categories: categories})
        })

        
    })
})

app.get("/:slug",(req, res) =>{
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render('article',{article: article})
        }else{
            res.redirect("/")
        }
    }).catch(erro =>{
        res.redirect("/")
    })
})

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            
            Category.findAll().then(categories =>{
                res.render("index",{articles: category.articles, categories: categories})
            })

        }else{
            res.redirect("/")
        }
    }).catch(erro =>{
        res.redirect("/")
    })
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
app.use('/', usersController);

app.listen(8080, ()=>{
    console.log("O servidor está rodando!")
})