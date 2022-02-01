//Herança

class Animal{
    constructor(nome, idade, preco){
        this.nome = nome;
        this.idade = idade;
        this.preco = preco;
    }

    ChecarEstoque(){
        return 10;
    }
}

class Cachorro extends Animal{

    constructor(){
        super(mome, idade, preco);
        this.porte;
    }

    MetodoQualquer(){
        confirm.log("AuAUAUAUA");
        super.ChecarEstoque();
    }

}

var dog = new Cachorro("Bucky", 20, 200);

console.log(dog.ChecarEstoque());