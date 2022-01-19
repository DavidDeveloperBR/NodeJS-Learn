class Filme {

    constructor(){
        this.titulo = "";
        this.ano = 0;
        this.genero = "";
        this.diretor = "";
        this.atores = [];
        this.duracao = 0;
    }

    Reporduzir(){
        console.log("Reproduzindo...");
    }

    Pausar(){
        console.log("Pausado ||");
    }

    Avancar(){
        console.log("Avançando >>");
    }

    Fechar(){
        console.log("Fechar X");
    }

}

var vingadores = new Filme();
var hulk = new Filme();
var starWars = new Filme();

vingadores.Reporduzir();

console.log("Titulo do filme: "+vingadores.titulo)
console.log("Titulo do filme: "+hulk.titulo)
console.log("Titulo do filme: "+starWars.titulo)