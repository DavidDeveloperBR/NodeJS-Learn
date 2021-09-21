const express = require('express');
const Category = require('./Category');
const router = express.Router();
const  slugify = require('slugify');

router.get('/categories',(req, res) => {

    res.send("ROTA DE CATEGORIAS!");

})

router.get('/admin/categories/new', (req, res) => {

    res.render('admin/categories/new.ejs')
})

router.post('/categories/save', (req, res) => {
     var title = req.body.title;

     if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title) // Desenvolvimento Web => desenvolvimento-web
        }).then(()=>{
            res.redirect("/")
        })    
     }else{
        res.redirect('/admin/categories/new');
     }
    
})


router.get('/admin/categories', (req, res) => {

    Category.findAll().then(categories =>{
        res.render('admin/categories/index.ejs', {categories: categories})
    })


})



module.exports = router;