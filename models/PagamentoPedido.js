const Sequelize = require('sequelize')
const connection = require('../database/db')
const Pedido = require('./Pedido');
const FormaPagamento = require('./FormaPagamento');

var PagamentoPedido = connection.define('pagamento_pedido', {
    pix: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
    },
    debito: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
    },
    credito: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
    },
    dinheiro: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
    },
    numero_pessoa: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

// Pedido.belongsToMany(FormaPagamento, { through: PagamentoPedido, foreignKey: 'id_pedido' });
Pedido.hasMany(PagamentoPedido, {
    foreignKey: 'id_pedido'
})
PagamentoPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido'
})


// PagamentoPedido.sync({ force: true })

module.exports = PagamentoPedido