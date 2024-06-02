const express = require('express')
const router = express.Router()
const Pedido = require('../models/Pedido')
const Pessoa = require('../models/Pessoa')
const Endereco = require('../models/Endereco')
const Produto = require('../models/Produto')
const Marca = require('../models/Marca')
const PedidoProduto = require('../models/PedidoProduto')
const PagamentoPedido = require('../models/PagamentoPedido')
const jwt = require('jsonwebtoken')
const verifyJWT = require('./authenticate')


const dateFormat = (date) => {
    var dia = date.getDate();
    var mes = date.getMonth() + 1; // O mês é base 0, então somamos 1
    var ano = date.getFullYear();

    // Formata o dia e o mês para sempre terem 2 dígitos
    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }

    return dia + "/" + mes + "/" + ano;
}

router.get('/pedido', verifyJWT, async (req, res) => {
  
    // localStorage.clear()
    const pedidos = await Pedido.findAll({
        nest: true,
        include: {
            model: Pessoa,
            required: true
        },
        raw: true,
    })
    var pedidosAjustados = []
    Promise.all(pedidos.map(async pedido => {
        var cliente = await Pessoa.findByPk(pedido.id_cliente)
        var atendente = await Pessoa.findByPk(pedido.id_funcionario)
        pedidosAjustados.push({
            codigo: pedido.id_pedido,
            data: dateFormat(pedido.data_pedido),
            cliente: cliente.nome_pessoa,
            mesa: pedido.mesa_pedido,
            valor: Number(pedido.valor_total).toFixed(2),
            atendente: atendente.nome_pessoa,
            status: pedido.status_pedido
        })
    })).then(() => {
        res.render('pedido', { pedidos: pedidosAjustados })
    })
})

router.get('/pedido/pagamento/:id', verifyJWT, async (req, res) => {
    const { id } = req.params
    const pedido = await Pedido.findByPk(id, {
        nest: true,
        include: {
            model: Pessoa,
            required: true
        },
        raw: true,
    })
    const novaData = dateFormat(pedido.data_pedido)
    var novoPedido = { ...pedido }
    novoPedido.data_pedido = novaData
    novoPedido.valor_total = Number(novoPedido.valor_total).toFixed(2)
    res.render('pagamento', { pedido: novoPedido })
})

router.get('/pedido/novopedido', verifyJWT, async (req, res) => {
    const pedidos = await Pedido.findAll({ raw: true })
    const clientes = await Pessoa.findAll({
        nest: true,
        include: {
            model: Endereco,
            required: true
        },
        raw: true,
        where: {
            isCustomer: true
        }
    })
    const empregados = await Pessoa.findAll({
        nest: true,
        include: {
            model: Endereco,
            required: true
        },
        raw: true,
        where: {
            isEmployee: true
        }
    })
    const produtos = await Produto.findAll({
        nest: true,
        include: {
            model: Marca,
            required: true
        },
        raw: true
    })
    res.render('newPedido', { pedidos: pedidos, clientes: clientes, empregados: empregados, produtos: produtos })
})

router.post('/pedido/pagamentoconfirmado', verifyJWT, async (req, res) => {
    const { valorTotalPedido, idPedido, numeroPessoas, inputTotal1, inputDinheiro1, inputDebito1, inputCredito1, inputPix1, inputTotal2, inputDinheiro2, inputDebito2, inputCredito2, inputPix2, inputTotal3,
        inputDinheiro3,
        inputDebito3,
        inputCredito3,
        inputPix3,
        inputTotal4,
        inputDinheiro4,
        inputDebito4,
        inputCredito4,
        inputPix4 } = req.body

    if (Number(inputTotal1) > 0) {
        const dinheiro = inputDinheiro1 > 0 ? Number(inputDinheiro1) : null
        const pix = inputPix1 > 0 ? Number(inputPix1) : null
        const credito = inputCredito1 > 0 ? Number(inputCredito1) : null
        const debito = inputDebito1 > 0 ? Number(inputDebito1) : null
        await PagamentoPedido.create({
            numero_pessoa: 1,
            dinheiro: dinheiro,
            pix: pix,
            debito: debito,
            credito: credito,
            id_pedido: Number(idPedido)
        })
    }
    if (Number(inputTotal2) > 0) {
        const dinheiro = inputDinheiro2 > 0 ? Number(inputDinheiro2) : null
        const pix = inputPix2 > 0 ? Number(inputPix2) : null
        const credito = inputCredito2 > 0 ? Number(inputCredito2) : null
        const debito = inputDebito2 > 0 ? Number(inputDebito2) : null
        await PagamentoPedido.create({
            numero_pessoa: 2,
            dinheiro: dinheiro,
            pix: pix,
            debito: debito,
            credito: credito,
            id_pedido: Number(idPedido)
        })
    }
    if (Number(inputTotal3) > 0) {
        const dinheiro = inputDinheiro3 > 0 ? Number(inputDinheiro3) : null
        const pix = inputPix3 > 0 ? Number(inputPix3) : null
        const credito = inputCredito3 > 0 ? Number(inputCredito3) : null
        const debito = inputDebito3 > 0 ? Number(inputDebito3) : null
        await PagamentoPedido.create({
            numero_pessoa: 3,
            dinheiro: dinheiro,
            pix: pix,
            debito: debito,
            credito: credito,
            id_pedido: Number(idPedido)
        })
    }
    if (Number(inputTotal4) > 0) {
        const dinheiro = inputDinheiro4 > 0 ? Number(inputDinheiro4) : null
        const pix = inputPix4 > 0 ? Number(inputPix4) : null
        const credito = inputCredito4 > 0 ? Number(inputCredito4) : null
        const debito = inputDebito4 > 0 ? Number(inputDebito4) : null
        await PagamentoPedido.create({
            numero_pessoa: 4,
            dinheiro: dinheiro,
            pix: pix,
            debito: debito,
            credito: credito,
            id_pedido: Number(idPedido)
        })
    }
    const pedido = await Pedido.findByPk(Number(idPedido))
    var pedidoAtualizado = { ...pedido }
    pedidoAtualizado.status_pedido = 'B'


    Pedido.update(pedidoAtualizado, {
        where: {
            id_pedido: Number(idPedido)
        }
    })

    res.redirect('/pedido')
})

router.get('/pedido/relatorio/:id', verifyJWT, async (req, res) => {
    const { id } = req.params
    const pedido = await Pedido.findByPk(id, {
        nest: true,
        include: {
            model: Pessoa,
            required: true
        },
        raw: true,
    })
    const novaData = dateFormat(pedido.data_pedido)
    var novoPedido = { ...pedido }
    novoPedido.data_pedido = novaData
    novoPedido.valor_total = Number(novoPedido.valor_total).toFixed(2)
    const produtos = await PedidoProduto.findAll({
        where: {
            id_pedido: id
        },
        nest: true,
        raw: true,
    })
    const pagamentos = await PagamentoPedido.findAll({
        where: {
            id_pedido: id
        },
        nest: true,
        raw: true,
    })
    // await pagamentos.map(pagamento)

    var produtosDoPedido = []
    Promise.all(produtos.map(async prod => {
        var produto = await Produto.findByPk(prod.id_produto)
        produtosDoPedido.push({
            codigo: produto.id_produto,
            descricao: produto.descricao,
            valor: prod.valor_pedidoProduto,
            quantidade: prod.quantidade_pedidoProduto
        })
    })).then(() => {
        res.render('relatorio', { pedido: novoPedido, produtos: produtosDoPedido, pagamentos: pagamentos })
    })
})

router.post('/pedido/new', verifyJWT, async (req, res) => {
    const { cliente, atendente, mesa, produtos } = req.body
    var arrayDeObjetos = JSON.parse(produtos);
    var total = 0;
    var produtosArray = []
    for (var i = 0; i < arrayDeObjetos.length; i++) {
        var produto = arrayDeObjetos[i];

        var preco = parseFloat(produto.preco); // Converte o preço para número
        var quantidade = parseInt(produto.quantidade); // Converte a quantidade para número
        produtosArray.push({
            quantidade_pedidoProduto: quantidade,
            valor_pedidoProduto: preco,
            id_produto: produto.id
        })


        // Verifica se o preço e a quantidade são números válidos
        if (!isNaN(preco) && !isNaN(quantidade)) {
            total += preco * quantidade;
        }
    }
    var newOrder = {
        status_pedido: 'P',
        mesa_pedido: mesa,
        valor_total: total,
        data_pedido: new Date(),
        id_cliente: cliente,
        id_funcionario: atendente,
    }

    const createdOrder = await Pedido.create(newOrder)
    produtosArray.map(async produto => {
        produto.id_pedido = createdOrder.id_pedido
        await PedidoProduto.create(produto)
    })
    res.redirect('/pedido')
})



module.exports = router;