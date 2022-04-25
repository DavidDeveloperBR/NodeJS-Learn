let supertest = require('supertest');
let app = require('../src/app');
let request = supertest(app);


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
    })
});