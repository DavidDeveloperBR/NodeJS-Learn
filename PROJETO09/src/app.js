let express = require('express');
let app = express();
let mongoose = require('mongoose');
let user = require('./models/User');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let JWTSecret = '42';

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/guiapics', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {}).catch(err => {
        console.log(err);
    });

let User = mongoose.model('User', user);


app.get('/', (req, res) => {
    res.json({});
});

app.post('/user', async (req, res) => {
    let {
        name,
        email,
        password
    } = req.body;

    if (name == '' || email == '' || password == '') {
        res.sendStatus(400);
        return;
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    try {
        let user = await User.findOne({
            "email": email
        });

        if (user != undefined) {
            res.statusCode = 400;
            res.json({
                error: "E-mail já cadastrado"
            });
            return;
        }

        let newUser = new User({
            name,
            email,
            password: hash
        });
        await newUser.save();
        res.json({
            email: email
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.delete('/user/:email', async (req, res) => {
    try {
        await User.deleteOne({
            'email': req.params.email
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/auth', async (req, res) => {
    let {
        email,
        password
    } = req.body;

    let user = await User.findOne({
        'email': email
    });

    if (user == undefined) {
        res.statusCode = 403;
        res.json({errors: {email:"E-mail não cadastrado"}});
        return;
    }

    let isPasswordRight = await bcrypt.compare(password, user.password);

    if(!isPasswordRight){
        res.statusCode = 403;
        res.json({errors: {password: "Senha incorreta"}});
        return;
    }

    jwt.sign({email,name: user.name, id: user._id}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.json({token});
        }
    });

})

module.exports = app;