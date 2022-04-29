const pdf = require('html-pdf');
const ejs = require('ejs');

let user = 'David Rodrigues';

// var html = `
// <h1 style='color: red'>Hello world</h1>
// <h2>Autor: <${user}></h2>
// <hr>
// <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, alias, aliquid, 
// amet, animi, asperiores, atque, autem, consequuntur, cumque, debitis, deleniti, doloremque, 
// doloribus, ducimus, eaque, earum, eius, eligendi, enim, error, esse, et, excepturi, explicabo, facere, 
// fugiat, harum, ipsa, ipsam, ipsum, itaque, iure, laboriosam, laudantium, libero, magnam, maxime, minima, 
// minus, modi, molestiae, nam, natus, neque, nihil, nobis, nisi, nostrum, nulla, numquam, odio, officia, 
// omnis, optio, pariatur, perferendis, perspiciatis, placeat, porro, praesentium, quae, quam, quasi, quas, 
// quia, quibusdam, quidem, quis, quisquam, quos, ratione, recusandae, repellendus, rerum, sapiente, sequi, 
// sint, sit, sunt, suscipit, tempora, temporibus, tenetur, totam, ut, vel, veritatis, vero, vitae, voluptas, 
// voluptatem, voluptates, voluptatum, voluptatibus, voluptatum.</p>

// <img src='https://www.gamereactor.pt/media/43/warcraft3_3074383b.jpg'/>
// `;

ejs.renderFile('./index.ejs', {user: user}, (err, html)=>{
    if(err){
        console.log(err);
    }else{
        pdf.create(html, {}).toFile("./meuPdf.pdf", (err, res) =>{
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        });
    }
});

