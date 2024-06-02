const Sequelize = require('sequelize')
const connection = require('../database/db')

var FormaPagamento = connection.define('forma_pagamento', {
    id_formaPagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_formaPagamento: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});


// FormaPagamento.sync({force: true})

module.exports = FormaPagamento