var User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


var secret = "42";

class UserController {
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    async edit(req, res) {
        var {
            id,
            name,
            email,
            role
        } = req.body;
        var result = await User.update(id, name, email, role);

        if (result != undefined) {
            if (result.status) {
                res.status(200);
                res.send("Usuário atualizado com sucesso!");
            } else {
                res.status(406);
                res.json(result.err);
            }
        } else {
            res.status(406);
            res.json("Erro ao atualizar usuário");
        }
    }

    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);

        if (user == undefined) {
            res.status(404);
            res.json({
                err: "Usuário não encontrado"
            });
            return;
        } else {
            res.status(200);
            res.json(user);
        }

    }

    async create(req, res) {

        var {
            name,
            email,
            password
        } = req.body;

        if (email == undefined || password == undefined || name == undefined) {
            res.status(400);
            res.json({
                err: "E-mail é inválido"
            });
            return;
        }

        var emailExists = await User.findEmail(email);
        if (emailExists) {
            res.status(406);
            res.json({
                err: "E-mail já cadastrado"
            });
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("Tudo OK!");

    }

    async remove(req, res) {
        var id = req.params.id;

        if (id != undefined) {
            var result = await User.delete(id);

            if (result.status) {
                res.status(200);
                res.send("Usuário deletado com sucesso!");
            } else {
                res.status(406);
                res.json(result.err);
            }
        }
    }

    async recoverpassword(req, res) {
        var email = req.body.email;

        var user = await User.findByEmail(email);

        if (user != undefined) {
            var result = await PasswordToken.create(user);

            if (result.status) {
                res.status(200);
                res.json({
                    message: result.message,
                    token: result.token
                });
            } else {
                res.status(406);
                res.json(result.err);
            }
        } else {
            res.status(406);
            res.json({
                err: "E-mail não existe!"
            });
        }

    }

    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token)
        if (isTokenValid.status) {
            await User.changePassword(isTokenValid.token.user, password, isTokenValid.token.token);
            await PasswordToken.setUsed(isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada com sucesso!");
        } else {
            res.status(406);
            res.send("Token inválido");
        }
    }

    async login(req, res) {
    
        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){
            var result = await bcrypt.compare(password, user.password);

            if(result){
                var token = jwt.sign({ email: user.email, role: user.role }, secret);
                res.status(200);
                res.json({token: token});
            }else{
                res.status(406);
                res.send("Senha incorreta");
            }

        }else{
            res.json({status: false, result: "Usuário não encontrado"});
        }

    }


}

module.exports = new UserController();