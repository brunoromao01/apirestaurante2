const Sequelize = require('sequelize')
const connection = require('../database/db')
const Pessoa = require('./Pessoa');


var Pedido = connection.define('pedido', {
    id_pedido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mesa_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_total: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    data_pedido: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status_pedido: {
        type: Sequelize.STRING(1),
        allowNull: false
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Pessoa.hasMany(Pedido, {
    foreignKey: 'id_cliente'
})
Pedido.belongsTo(Pessoa, {
    foreignKey: 'id_cliente'
})

Pessoa.hasMany(Pedido, {
    foreignKey: 'id_funcionario'
})
Pedido.belongsTo(Pessoa, {
    foreignKey: 'id_funcionario'
})

// Pedido.sync({ force: true })

module.exports = Pedido