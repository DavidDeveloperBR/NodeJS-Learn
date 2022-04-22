let express = require('express');

let app = express();

app.get('/', async (req, res) =>{
    res.json({success: true});
});

app.get('/cor/:pessoa', (req, res) => {
    let pessoa = req.params.pessoa;
    if(pessoa == 'victor'){
        res.json({cor: 'vermelho'});
    }
});

module.exports = app;