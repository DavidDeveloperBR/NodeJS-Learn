var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('express-flash');
var cookie = require('cookie-parser');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json);
app.use(flash());

app.use(cookie("excalibur"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

  //--------------------------------------------------//

app.get("/", (req, res) => {
   
    var emailError = req.flash("emailError");
    var nomeError = req.flash("nomeError");
    var pontosError = req.flash("pontosError");
    var email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
    email = (email == undefined || email.length == 0) ? "" : email;

    res.render('index', {emailError, nomeError, pontosError, email});
});

app.post("/form", (req, res) => {
    var {email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio!";
    }

    if(nome == undefined || nome == ""){
        nomeError = "Nome não pode ser vazio!";
    }

    if(nome.length() < 4){
        nomeError = "Nome não pode ser menor que 4 caracteres!";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos!";
    }

    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);

        req.flash("email", email);
        res.redirect('/')
    }else{
        res.send("SHOW DE BOLA!")
    }

});


app.listen(5678, (req,res) => {
    console.log("Servidor rodando");
});