const Sequelize = require('sequelize')
const connection = require('../database/db')
const Pedido = require('./Pedido');
const Produto = require('./Produto');

var PedidoProduto = connection.define('pedido_produto', {
    quantidade_pedidoProduto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor_pedidoProduto: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Pedido.belongsToMany(Produto, { through: PedidoProduto, foreignKey: 'id_pedido' });
Produto.belongsToMany(Pedido, { through: PedidoProduto, foreignKey: 'id_produto' });


// PedidoProduto.sync({ force: true })

module.exports = PedidoProduto