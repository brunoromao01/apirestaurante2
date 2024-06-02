const Sequelize = require('sequelize')
const connection = require('../database/db')
const Uf = require('../models/Uf')

var Cidade = connection.define('cidade', {
    id_cidade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_cidade: {
        type: Sequelize.STRING(50)
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Uf.hasMany(Cidade, {
    foreignKey: 'id_uf'
})
Cidade.belongsTo(Uf, {
    foreignKey: 'id_uf'
})

// Cidade.sync({ force: true })

module.exports = Cidade