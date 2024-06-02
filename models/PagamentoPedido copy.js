const Sequelize = require('sequelize')
const connection = require('../database/db')
const Pedido = require('./Pedido');
const FormaPagamento = require('./FormaPagamento');

var PagamentoPedido = connection.define('pagamento_pedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    valor_PagamentoPedido: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    numero_pessoa: {
        type: Sequelize.TINYINT(1),
        allowNull: false
    }
}, {
    freezeTableName: true // Isso impede a pluralização automática do nome da tabela
});

Pedido.belongsToMany(FormaPagamento, { through: PagamentoPedido, foreignKey: 'id_pedido' });
FormaPagamento.belongsToMany(Pedido, { through: PagamentoPedido, foreignKey: 'id_formaPagamento' });


// PagamentoPedido.sync({ force: true })

module.exports = PagamentoPedido