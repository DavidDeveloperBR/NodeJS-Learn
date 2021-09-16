const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress','root', '12345678',{
    host: '127.0.0.1',
    dialect:'mysql',
    port:'3303'
});


module.exports = connection;