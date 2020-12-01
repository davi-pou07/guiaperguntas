//Criar modulo sequelize
const Sequelize = require('sequelize')

//Criar coneão com banco
const connection = new Sequelize('guiaperguntas','root','davi6259',{
    host:'localhost',
    dialect: 'mysql'
})

//exportar conexão
module.exports = connection;