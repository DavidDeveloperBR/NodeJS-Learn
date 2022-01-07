
var empresa = {
    nome: "Loja do David",
    email: "david@mail.com",
    cidade: "Veilstone"
}

var empresa2 = {
    ...empresa
}

var {nome,email,cidade} = empresa;


console.log(empresa2)

function soma(a,b = 0){
    return a+b;
}

console.log(soma(2,2));

var soma = (a,b,c)=>{
    return a+b+c;
}

var soma2 = a =>{
    return a+b+c;
}

var soma2 = a => a+4;

var users = [empresa,empresa2];

var usuario = users.find(user => user.email == "Loja do David");