var knex = require('../database/connection');
var bcrypt = require('bcrypt');
class User{

    async findAll(){

        try {
           var result=  await knex.select('id','name','email','role').table('users');
            return result;
        } catch (err) {
            console.log(error);
            return [];
        }

    }

    
    async findById(id){
        
        try {
            var result = await knex.select('id','name','email','role').where({id: id}).table('users');
            
            if (result.length > 0) {
                return result[0];
            }else{
                console.log("Não encontrado");
                return undefined;
            }
 
         } catch (err) {
             console.log(error);
             return undefined;
         }

    }

    async new(name, email, password){

        try {
            var hash = await bcrypt.hash(password, 10);
            await knex.insert({name, email, password: hash, role: 0}).into('users').catch(err => {
                console.log(err);
            });
        } catch (e) {
            console.log(error);
        }
 
    }

    async findEmail(email){

        try {
            var result = await knex.select('*').from('users').where({email: email});

            if(result.length > 0) {
                return true;
            } else {
                return false;
            }

            console.log(result);
        } catch (err) {
            console.log(error);
            return false;
        }
        
    }

    async update(id, name, email, role){    

        var user = await this.findById(id);

        if (user != undefined){
            var editUser = {};

            if (email != undefined) {
                if(email != user.email) {
                    var result = await this.findEmail(email);
                    if(result == false) {
                        editUser.email = email;
                    }
                }else{
                   return {status: false, err: "E-mail já cadastrado"};
                }
                
            }
            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({id: id}).table('users');
                return {status: true, message: "Usuário atualizado com sucesso"};
            } catch (error) {
                return {status: false, err: error};
            }
            

        }else{
            return {status: false, err: "Usuário não encontrado"};
        }

    }

    async delete(id){

       var user = await this.findById(id);

       if(user != undefined){
           try {
            await knex.delete().where({id: id}).table('users');

            return {status: true, message: "Usuário deletado com sucesso"};
           } catch (error) {
               return {status: false, err: error};
           }         

       }else{
           return {status: false, err: "Usuário não existe!"};
       }

    }

}
module.exports = new User();