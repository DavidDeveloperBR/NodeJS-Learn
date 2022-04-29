const express = require('express');
const multer = require("multer");
const path = require("path");
let app = express();

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function(req, file, callBack){
        callBack(null, 'uploads/')
    },
    filename: function(req, file, callBack){
        callBack(null, file.originalname + Date.now()+path.extname(file.originalname));
    }

})

const upload = multer({storage});

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.post('/upload',upload.single('file'), (req, res) => {
    res.send('Arquivo enviado com sucesso!');
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
})