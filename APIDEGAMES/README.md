# API de Games

Essa API é para aprendizado de aplicações RESTFUL em JavaScript utilizando os frameworks Axios e Express.

## Endpoints

### GET /games
Esse endpoint é responsável por retornar listagem todos os games cadastrados no banco de dados. 
#### Parâmetros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.

Exemplo de resposta:
```
{
    "games": [
        {
            "id": 1,
            "title": "God Of War",
            "ano": 2019,
            "preco": 200
        },
        {
            "id": 34,
            "title": "Lost Ark",
            "ano": 2022,
            "preco": 0
        },
        {
            "id": 101,
            "title": "Horizon Zero Down",
            "ano": 2018,
            "preco": 150
        }
    ]
}

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que ocorreu alguma falha na autenticação da requisição. 
Motivos: Token inválido ou expirado. 

Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```
### POST /auth
Esse endpoint é responsável por autenticar o usuário na API
#### Parâmetros
email: Email do usuário cadastrado.
pasword: Senha do usuário cadastrado.

Exemplo:
```
{
    "email":"sayajin@mail.com",
    "password":"dragonballs"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber um token JWT válido para acessar os endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzYXlhamluQG1haWwuY29tIiwiaWF0IjoxNjQ1ODI0NzQyLCJleHAiOjE2NDU5OTc1NDJ9
    .uvcv7L7G9bJAt_xuT1QYGRf8GA2jxgWxbWPKa5yhzCc"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que ocorreu alguma falha na autenticação da requisição. 
Motivos: E-mail ou senha inválidos. 
```
{
    "err": "Creenciais inválidas"
}
```
