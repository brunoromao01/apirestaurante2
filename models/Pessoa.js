const Sequelize = require('sequelize')
const connection = require('../database/db')
const Endereco = require('./Endereco')
const Cargo = require('./Cargo')


var Pessoa = connection.define('pessoa', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    cpf_pessoa: {
        type: Sequelize.STRING(11),
        allowNull: false,
    },
    email_pessoa: {
        type: Sequelize.STRING(50),
    },
    celular_pessoa: {
        type: Sequelize.STRING(11)
    },
    isEmployee :{
        type: Sequelize.BOOLEAN
    },
    isCustomer :{
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Endereco.hasOne(Pessoa, {
    foreignKey: 'id_endereco'
})
Pessoa.belongsTo(Endereco, {
    foreignKey: 'id_endereco'
})

Cargo.hasMany(Pessoa, {
    foreignKey: 'id_cargo'
})
Pessoa.belongsTo(Cargo, {
    foreignKey: 'id_cargo'
})

// Pessoa.sync({force: true})

module.exports = Pessoa