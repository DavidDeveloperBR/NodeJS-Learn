var knex = require('../database/connection');
var bcrypt = require('bcrypt');
class User{

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


}
module.exports = new User();