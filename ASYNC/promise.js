function pegarUsuarios(){
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve([
                {nome: "David", linguagem: "Python"},
                {nome: "Julian", linguagem: "Java"},
                {nome: "Deivisson", linguagem: "C++"}
            ]);

        },5000)

    })
}

async function main(){
    var usuarios = await pegarUsuarios();

    console.log(usuarios)
    console.log("Olá!")
}

//main();


function pegarId(){
    return new Promise((resolve, ) =>{
        setTimeout(()=>{
            resolve(5);
        },2000)
    })
}

function buscarEmailBanco(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("david@mail.com");
        },2000)
    })
}



function enviarEmail(corpo, para){

    return new Promise((resolve, reject)=>{
        setTimeout(()=> {
            var deuErro = true;

            console.log("Email enviado!")

            if(!deuErro){
                resolve({time: 6, to:"david@mail.com"}); //promessa ok
            }else{
                reject("Erro 404"); // falhou
            }
        },4000)
    });
}

// enviarEmail("Oi, eu sou o Goku.", "Vegeta").then(({time, to})=>{
//     console.log(`Time: ${time}
//     --------------------------------
//     To: ${to}`)
// }).catch((erro) =>{
//     console.log(erro);
// })

// console.log("Inicio!");
// pegarId().then((id)=>{
//     buscarEmailBanco(id).then((email)=>{
//         enviarEmail("Olá como vai?", email).then(() =>{
//             console.log(`Email enviado para o id: ${id}`)
//         }).catch(erro =>{
//             console.log(erro)
//         })
//     })
// })
// console.log("Fim!");

async function teste(){
    var  id = await pegarId();
    var email = await buscarEmailBanco(id);
    try {
        await enviarEmail("Olá como vai?", email);
        console.log("E-mail enviado com sucesso!");
    } catch (error) {
        console.log(error)
    }
}

teste();