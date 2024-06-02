const Sequelize = require('sequelize')
const connection = require('../database/db')

var Cargo = connection.define('cargo', {
    id_cargo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_cargo: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});


// Cargo.sync({force: true})

module.exports = Cargo