//Composição

class Dado{
    constructor(faces){
        this.faces = faces;
    }

     Rolar(){
        console.log("Resultado:"+ this.getRandomInt(1,this.faces));

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

}

var dado = new Dado(100);

dado.Rolar();