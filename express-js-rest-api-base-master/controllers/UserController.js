var User = require('../models/User');
class UserController {
    async index(req, res) {
        var users = await User.findAll();
        res.json(users);
    }

    async edit(req, res) {
        var {id, name, email, role} = req.body;
        var result = await User.update(id, name, email, role);

        if(result != undefined) {
           if (result.status) {
               res.status(200);
               res.send("Usuário atualizado com sucesso!");
           }else{
                res.status(406);
                res.json(result.err);
            }
        }else{
            res.status(406);
            res.json("Erro ao atualizar usuário");
        }
    }

    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id);

        if(user == undefined) {
            res.status(404);
            res.json({err: "Usuário não encontrado"});
            return;
        }else{
            res.status(200);
            res.json(user);
        }

    }

    async create(req, res) {
        
        var {name, email, password} = req.body;

        if(email == undefined || password == undefined || name == undefined) {
            res.status(400);
            res.json({err: "E-mail é inválido"});
            return;
        }
        
        var emailExists = await User.findEmail(email);
        if(emailExists) {
            res.status(406);
            res.json({err: "E-mail já cadastrado"});
            return;
        }

        await User.new(name, email, password);

        res.status(200);
        res.send("Tudo OK!");

    }

    async remove(req, res) {
        var id = req.params.id;

        if(id != undefined){
            var result = await User.delete(id);

            if (result.status) {
                res.status(200);
                res.send("Usuário deletado com sucesso!");
            }else{
                res.status(406);
                res.json(result.err);
            }
        }
    }

    
}

module.exports = new UserController();