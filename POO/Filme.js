class Filme {

    constructor(titulo, ano, genero, diretor, duracao ){
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.diretor = diretor;
        this.duracao = duracao;
        this.atores = [];
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

    Ficha(){
        console.log("Titulo: "+this.titulo+" , Ano: "+this.ano+" , Genero: "
        +this.genero+" , Diretor: "+this.diretor+" , Duração: "+this.duracao+" , Atores: "+this.atores);
        this.Reporduzir();
    }

}


var vingadores = new Filme();

vingadores.titulo = "Vingadores 2";
vingadores.ano = 2014;
vingadores.genero = "Ação";

console.log(vingadores);

var batman = new Filme();

batman.titulo = "Batman Begins";
batman.ano = 1995;
batman.genero = "Ação";

console.log(batman);

var hulk = new Filme("O Incrivel Hulk",2010, "Ação", "Sicrano", 120);

hulk.Ficha();