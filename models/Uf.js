const Sequelize = require('sequelize')
const connection = require('../database/db')

var Uf = connection.define('uf', {
    id_uf: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_uf: {
        type: Sequelize.STRING(50)
    },
    sigla_uf: {
        type: Sequelize.STRING(2)
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});


// Uf.sync({force: true})

module.exports = Uf