const Sequelize = require('sequelize')
const connection = require('../database/db')

var Usuario = connection.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});



// Usuario.sync({ force: true })


module.exports = Usuario