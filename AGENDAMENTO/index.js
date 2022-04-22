const express = require('express');
const mongoose = require('mongoose');
const app = express();
const AppointmentService = require('./services/AppointmentService');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.set('engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/agendamento', {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", (req, res) =>{
    res.render('index.ejs');
})

app.get("/cadastro", (req, res) =>{
    res.render('create.ejs');
})


app.post("/create", async (req, res) =>{

    var status = await AppointmentService.create(req.body.name, 
        req.body.email, 
        req.body.cpf, 
        req.body.description, 
        req.body.date, 
        req.body.time);
    res.redirect('/');

    if(status){
        res.send("Cadastrado com sucesso!");
        res.redirect('/');
    }else{ 
        res.send("Erro ao cadastrar!");
    }

});

app.get('/getcalendar', async (req, res) =>{
    var appointments = await AppointmentService.getAll(false);
    res.json(appointments);
});

app.get('/event/:id', async(req, res) =>{  
    var appointment = await AppointmentService.getById(req.params.id);
    console.log(appointment);
    res.render('event.ejs',{appo: appointment});

})

app.post('/finish', async (req, res) =>{
    var id = req.body.id;
    var result = await AppointmentService.finish(id);
    res.redirect('/');
});

app.get('/list', async (req, res) =>{
    //await AppointmentService.search('david.rodrigues@ufba.br')

    var appos = await AppointmentService.getAll(true);
    res.render('list.ejs', {appos});
});

app.get('/searchresult', async (req, res) =>{
    var appos = await AppointmentService.search(req.query.search);
    res.render('list.ejs', {appos});
});

const pollTime = 1000 * 60 * 5;
setInterval(() => {
    AppointmentService.sendNotification();
    
}, pollTime);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});