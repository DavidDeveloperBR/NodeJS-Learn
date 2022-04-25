let express = require('express');
let app = express();
let mongoose = require('mongoose');
let user = require('./models/User');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/guiapics',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(res =>{
    }).catch(err =>{
        console.log(err);
    });

let User = mongoose.model('User', user);


app.get('/', (req, res) => {
    res.json({});
});

app.post('/user', async (req, res) => {
    try{
        let {name, email, password} = req.body;
        let newUser = new User({name, email, password});
        await newUser.save();
        res.json({email: email});
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = app;