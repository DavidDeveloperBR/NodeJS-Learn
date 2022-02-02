const fs = require('fs');
const util = require('util')


class Reader{

    constructor(){
        this.reader = util.promisify(fs.readFile);
    }

    async Read(filepath){
        try{
            return await this.reader(filepath ,'utf-8');
        }catch(err){
            return undefined;
        }
        


        // fs.readFile(filepath,{encoding: 'utf-8'}, (err, dados)=>{
        //     if(err){
        //         console.log("Ocorreu um erro ao ler o arquivo. \n"+err)
        //     }else{
        //         console.log(dados);
        //     }
        // })
    }
}

module.exports = Reader;