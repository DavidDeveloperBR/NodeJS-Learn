const mongoose = require('mongoose');
const ArticleModel = require('./Article');

mongoose.connect('mongodb://localhost:27017/aprendendoMongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Article = mongoose.model("Article", ArticleModel);

/* Deletando um registro */
// Article.findByIdAndDelete('625dd3845c9bb36e4518a986').then(() => {
//     console.log('Artigo deletado com sucesso!');
// }).catch(err =>{
//     console.log('Erro ao deletar artigo: ', err);
// });

/* Atualizando um registro */
// Article.findByIdAndUpdate('625dd8ab8fdd79b131464361', { title: 'Novo titulo', author: 'Zé Ninguém' })
// .then(() => {
//     console.log('Artigo atualizado com sucesso!');
// }).catch(err => {
//     console.log('Erro ao atualizar artigo: ', err);
// });


/* find normal */
// Article.find({'author': 'David Rodrigues', 'title': 'React Avançado'}).then(articles =>{
//     console.log(articles);
// }).catch(err =>{
//     console.log(err);
// });

/*find com objeto aninhado */
// Article.findOne({'resume.content': 'React é uma biblioteca JavaScript de código aberto'}).then(articles =>{
//     console.log(articles);
// }).catch(err =>{
//     console.log(err);
// });


/*findOne */
// Article.findOne({'author': 'David Rodrigues'}).then(articles =>{
//     console.log(articles);
// }).catch(err =>{
//     console.log(err);
// });



/* Find All
Article.find({}).then(articles =>{
    console.log(articles);
}).catch(err =>{
    console.log(err);
});
*/


/*Criação*/
// const artigo = new Article({
//     title: "React Avançado",
//     author: "David Rodrigues",
//     body:"React é uma biblioteca JavaScript de código aberto, utilizada para construir interfaces de usuário em aplicações web. "+
//     "React foi criado em 2013 por Facebook como parte do Projeto de Iniciação Científica da empresa Facebook.",
//     resume: {
//         content: "React é uma biblioteca JavaScript de código aberto",
//         author: "David Rodrigues"
//     }
// });

// artigo.save().then(() => {
//     console.log("Artigo salvo com sucesso!");
// }).catch((err) => {
//     console.log(err);
// });



