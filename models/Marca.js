const Sequelize = require('sequelize')
const connection = require('../database/db')

var Marca = connection.define('marca', {
    id_marca: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_marca: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});


// Marca.sync({force: true})

module.exports = Marca