const fs = require('fs');

// let conteudo;

// fs.readFile("./david.rodrigues", {encoding: 'utf8'}, (erro, dados) => {

//     if(erro){
//         console.log("Arquivo danificado!");
//     }else{
//         conteudo = dados;
//         console.log(conteudo);
//     }
// });

// fs.writeFile("./david.rodrigues"," Nome: David Rodrigues ", (error) => {

//     if(erro){
//         console.log("Erro ao escrever no arquivo!");
//     }
// });


function modificarUsuario(nome, profissao, idade){

let conteudo;
fs.readFile("./usuario.json", {encoding: 'utf-8'}, (error, dados)=>{

    if(error){
        console.log("Erro ao ler o arquivo!");
    }else{

        conteudo = JSON.parse(dados);
        conteudo.nome = nome;
        conteudo.Profissao = profissao;
        conteudo.idade = idade;

        fs.writeFile("./usuario.json", JSON.stringify(conteudo), (erro)=> {
            if(erro){
                console.log("Ocorreu um erro ao escrever no arquivo.")
            }
        })
    }
})
}

modificarUsuario("José de Abreu", "Ator", "80")