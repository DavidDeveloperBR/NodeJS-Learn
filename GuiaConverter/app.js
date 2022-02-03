var Reader = require('./Reader');
var Processor = require('./Processor');
var Table = require('./Table')



var leitor = new Reader();

async function main(){

    let dados = await leitor.Read("./users.csv");
    
    var dadosProcessados = Processor.Process(dados);

    var usuarios = new Table(dadosProcessados);

    usuarios.rows.push(["George Soros", "Soros Company", "2"])
    // console.log(usuarios.header);
    // console.log(usuarios.rows);
    console.log(usuarios.RowCount);
    console.log(usuarios.ColumnCount);
}

main();