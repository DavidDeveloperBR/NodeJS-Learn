let supertest = require('supertest');
let app = require('../src/app');
let request = supertest(app);

let mainUser = {name: "David Rodrigues", email: "david@mail.com", password: "123456"};


beforeAll(() => {
    //Inserir usuario no banco de dados
    return request.post('/user').send(mainUser)
        .then(res =>{})
        .catch(err => {
            console.log(err);
        });
});

afterAll(() => {
    //Remover usuário do banco de dados
    return request.delete(`/user/${mainUser.email}`)
        .then(res =>{})
        .catch(err =>{
            console.log(err);
        });
});

// beforeEach(() => { //Antes de cada teste
//     console.log("Hello World");
// });

// afterEach(() => { //Depois de cada teste
//     console.log("Hello World");
// });

describe('Cadastro de Usuario', () =>{

    test('Deve cadastrar um usuario com sucesso', () =>{

        let time = Date.now();
        let email = `${time}@mail.com`;
        let user = {name: 'David', email, password: '123456'};

        return request.post('/user')
            .send(user).then(res =>{

            let status = res.statusCode;
            expect(status).toEqual(200);
            expect(res.body.email).toEqual(email);

        }).catch(err =>{
            console.log(err);
        });
    });

    test('Deve impedir que um usuario cadastro com os dados vazios', () =>{
        let user = {name: '', email:'', password: ''};

        return request.post('/user').send(user)
        .then(res =>{
            expect(res.statusCode).toEqual(400); //400 = Bad Request
        })
        .catch(err =>{
            console.log(err);
        });
    });

    test('Deve impedir que um usuario cadastre e-mails repetidos', () =>{

        let time = Date.now();
        let email =`${time}@mail.com`;
        let user = {name: 'David', email, password: '123456'};

        return request.post('/user').send(user).then(res =>{
            let status = res.statusCode;
            expect(status).toEqual(200);
            expect(res.body.email).toEqual(email);

            return request.post('/user').send(user).then(res =>{
                expect(res.statusCode).toEqual(400); //400 = Bad Request
                expect(res.body.error).toEqual("E-mail já cadastrado");
            }).catch(err =>{
                console.log(err);
            });

        }).catch(err =>{
            console.log(err);
        });
    });
});

describe('Autenticação', () =>{
    test('Deve me retornar um token quando logar', () =>{
        return request.post('/auth').send({email: mainUser.email, password: mainUser.password})
        .then(res =>{
            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
        }).catch(err =>{
            fail(err);
        });
    });

    test('Deve impedir que usuário se logue com um email inválido', () =>{
        return request.post('/auth').send({email: "qualquer@mail.com", password: "0987654321"})
        .then(res =>{
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.email).toEqual("E-mail não cadastrado");
        }).catch(err =>{
            fail(err);
        });
    })


    test('Deve impedir que usuário se logue com uma senha inválida', () =>{
        return request.post('/auth').send({email: mainUser.email, password: "0987654321"})
        .then(res =>{
            expect(res.statusCode).toEqual(403);
            expect(res.body.errors.password).toEqual("Senha incorreta");
        }).catch(err =>{
            fail(err);
        });
    })
});