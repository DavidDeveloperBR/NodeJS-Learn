var Reader = require('./Reader');


var leitor = new Reader();



async function main(){

    let dados = await leitor.Read("./users.csv");
    console.log(dados);

}

main();