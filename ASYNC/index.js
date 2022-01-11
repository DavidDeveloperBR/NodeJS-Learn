// setTimeout(() =>{
//  console.log("Meu nome é Jonathan Joestar");
// },20000);

// function email(corpo,para, callback){
//     setTimeout(() =>{
//         console.log(`Para: ${para}
//         --------------------
//         ${corpo}
//         --------------------
//         De: Dio Brando`);
//         callback("OK",5, "8s", "Dio");
//     },8000);
// }

// console.log("Inicio do envio do e-mail.")
// email("KONO DIO DA!!", "Jonathan Joestar", (status, amount, time, nome)=>{
//     console.log("ISSO E UM CALLBACK!")
//     console.log(`
//                 Nome: ${nome}
//                 -------------------
//                 Status: ${status}
//                 -------------------
//                 Quantidade: ${amount}
//                 --------------------
//                 Tempo: ${time}`)
// });


function email(corpo,para, callback){
    setTimeout(() =>{
        
        //....Logica 

        var deuErro = false;

        if(deuErro){
            callback(12,"Envio do e-mail falhou!");
        }else{
            callback(12);
        }

        
    },8000);
}

console.log("Inicio do envio do e-mail.")
email("KONO DIO DA!!", "Jonathan Joestar", (time, erro)=>{
    if(erro == undefined){
        console.log("TUDO OK!");
        console.log(`Time: ${time}s`);
    }else{
        console.log("Ocorreu um erro. " + erro);
        console.log(`Time: ${time}s`);
    }

});




