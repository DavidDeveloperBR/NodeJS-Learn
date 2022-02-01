class Leitor{

    ler(caminho){
        return "Conteudo do arquivo";
    }
}

class Escritor{

    Escrever(arquivo, conteudo){
        console.log("Escrevendo arquivo: "+arquivo);
    }

}

class Criador{

    Criar(nome){
        console.log("Criando arquivo.")
    }
}

class Destruidor{

    Deletar(nome){
        console.log("Deletando arquivo");
    }
}

class ManpuladorArquivo{

    constructor(nome){
        this.nome = nome;
        this.leitor = new Leitor();
        this.escritor = new Escritor();
        this.criador = new Criador();
        this.destruidor = new Destruidor();
    }

}

var manipulador = new ManpuladorArquivo("MeuArquivo.txt");

manipulador.criador.Criar();

manipulador.escritor.Escrever;

manipulador.leitor.ler();

manipulador.destruidor.Deletar();