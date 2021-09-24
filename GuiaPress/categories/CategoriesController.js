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
            res.redirect("/admin/categories")
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


router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    
    if(id != undefined){
        
        if(!isNaN(id)){

            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else{//não for um número
            res.redirect('/admin/categories')
        }
     }else{//null
        res.redirect('/admin/categories');
     }
})

router.get("/admin/categories/edit/:id",(req,res) => {
    var id = req.params.id;
     if(isNaN(id)){
        res.redirect('/admin/categories')
     }

    Category.findByPk(id).then(category=>{
        if(category != undefined){
            res.render("admin/categories/edit",{category: category});
        }else{
            res.redirect('/admin/categories');
        }
    }).catch(erro =>{
        res.redirect('/admin/categories')
    })
})


router.post("/categories/update",(req,res) => {
    var id = req.body.id;
    var title = req.body.title;

     if(isNaN(id)){
        res.redirect('/admin/categories')
     }

    Category.update({title: title, slug: slugify(title)},{
        where:{
            id: id
        }
    }).then(()=>{
        res.redirect('/admin/categories')
    });
})




module.exports = router;