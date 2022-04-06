var knex = require('../database/connection');

class PasswordToken {

    async create(user){

        
        var token = Date.now();
       
            try {
                await knex.insert({
                    user: user.id,
                    used: 0,
                    token: token
                }).table('passwordtokens');
                return {status: true, message: "Token criado com sucesso!", token: token};
            } catch (err) {
                console.log(err);
                return {status: false, err: err};
            }

        
    }

    async validate(token){
        try {
            var result = await knex.select().where({token: token}).table('passwordTokens');

            if(result.length > 0) {
                if(result.used != 0){
                    return {status: false};
                }else{
                    var tk = result[0];
                    return {status: true, token: tk};
                }
            } else {
                return {status: false};
            }

        } catch (err) {
            console.log(err);
            return {status: false};
        }
        
    }

    async setUsed(token){
        try {
            await knex.update({used: 1}).where({token: token}).table('passwordTokens');
        }catch(err){
            console.log(err);
        }
    }

}

module.exports = new PasswordToken();