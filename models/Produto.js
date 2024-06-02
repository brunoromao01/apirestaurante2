const Sequelize = require('sequelize')
const connection = require('../database/db')
const Marca = require('./Marca');

var Produto = connection.define('produto', {
    id_produto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    custo_produto: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    preco_produto: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    // unidade_produto: {
    //     type: Sequelize.TEXT,
    //     allowNull: false,
    // },
    // quantidade_produto: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    // }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Marca.hasMany(Produto, {
    foreignKey: 'id_marca'
})
Produto.belongsTo(Marca, {
    foreignKey: 'id_marca'
})


// Produto.sync({ force: true })


module.exports = Produto