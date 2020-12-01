//Definir um model
//Fazendo importação
const Sequelize= require("sequelize")
const connection = require("./databases")
//Criando tabela pergunta
const Pergunta= connection.define("perguntas",{  
    //Criando titlo tipo string e not null
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
   descricao:{
       type: Sequelize.TEXT,
       allowNull: false
   }

})
//criar tabela no banco
//Não vai forãr criação da tabela caso ja exista

Pergunta.sync({force:false}).then(()=>{})
//exportando model
module.exports = Pergunta
