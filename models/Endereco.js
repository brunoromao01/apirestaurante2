const Sequelize = require('sequelize')
const connection = require('../database/db')
const Cidade = require('./Cidade')


var Endereco = connection.define('endereco', {
    id_endereco: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    logradouro_endereco: {
        type: Sequelize.STRING(50)
    },
    numero_endereco: {
        type: Sequelize.STRING(10)
    },
    cep_endereco: {
        type: Sequelize.STRING(10)
    },
    bairro_endereco: {
        type: Sequelize.STRING(50)
    },
    complemento_endereco: {
        type: Sequelize.STRING(50)
    }

}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Cidade.hasMany(Endereco, {
    foreignKey: 'id_cidade'
})
Endereco.belongsTo(Cidade, {
    foreignKey: 'id_cidade'
})




// Endereco.sync({force: true})

module.exports = Endereco