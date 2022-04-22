let app = require('../src/app');
let supertest = require('supertest');

let request = supertest(app);

test("A aplicação deve responder na porta 3131", () => {

    return request.get("/").then(res => {
        expect(res.statusCode).toEqual(200);
    });
    // try{
    //     let res = await request.get("/");
    //     expect(res.statusCode).toEqual(404);
    // }catch(err){

    // }

});


test("Deve retornar vermelho como cor favorita do Victor", () => {

    return request.get('/cor/victor').then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.cor).toEqual('azul');
    });
})