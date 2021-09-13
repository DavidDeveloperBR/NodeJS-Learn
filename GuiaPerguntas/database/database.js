const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas',  'root', '12345678',{
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    port: 3303

});

module.exports = connection;