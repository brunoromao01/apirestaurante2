const express = require('express')
const router = express.Router()
const Produto = require('../models/Produto')
const PedidoProduto = require('../models/PedidoProduto')
const Marca = require('../models/Marca')
const verifyJWT = require('./authenticate')


router.get('/produto', verifyJWT, async (req, res) => {
    //rota para a view onde lista os produtos cadastrados
    const produtos = await Produto.findAll({
        nest: true,
        include: {
            model: Marca,
            required: true
        },
        raw: true
    })
    res.render('produto', { produtos: produtos })

})

router.get('/produto/new', verifyJWT, async (req, res) => {
    //rota para carregar tela de novo cliente
    const marcas = await Marca.findAll({ raw: true })
    var marcasPorNome = marcas.sort(function (a, b) {
        var nomeA = a.nome_marca; // Converter para maiúsculas para ordenação sem distinção entre maiúsculas e minúsculas
        var nomeB = b.nome_marca;
        if (nomeA < nomeB) {
            return -1; // Retorna um número negativo se nomeA for menor que nomeB
        }
        if (nomeA > nomeB) {
            return 1; // Retorna um número positivo se nomeA for maior que nomeB
        }
        return 0; // Retorna 0 se os nomes forem iguais
    });
    res.render('newProduto', { marcas: marcasPorNome })

})

router.post('/produto/novamarca', verifyJWT, async (req, res) => {
    console.log(req.body)
    res.send('ok')
})

router.post('/produto/create', verifyJWT, async (req, res) => {
    //rota para cadastrar produto
    try {
        var newProduto = {
            custo_produto: Number(req.body.custo),
            preco_produto: Number(req.body.preco),
            descricao: req.body.nome,
            id_marca: Number(req.body.marca)
        }
        const createdProduct = await Produto.create(newProduto)
        res.redirect('/produto')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})

router.get('/produto/edit/:id', verifyJWT, async (req, res) => {
    //rota para chamar tela de edição (recebe id e preenche os campos respectivos)
    var id = req.params.id
    try {
        const produto = await Produto.findByPk(id, { raw: true })
        const marcas = await Marca.findAll({ raw: true })

        res.render('editProduto', { produto: produto, marcas: marcas })
    } catch (error) {
        console.log(error)
    }
})

router.post('/produto/update', verifyJWT, async (req, res) => {
    //rota para atualizar produto
    var updatedProduct = {
        custo_produto: req.body.custo,
        preco_produto: req.body.preco,
        descricao: req.body.nome,
        id_marca: req.body.marca
    }
    try {
        const createdProduct = await Produto.update(updatedProduct, {
            where: {
                id_produto: req.body.idProduto
            }
        })
        res.redirect('/produto')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})

router.post('/produto/delete/', verifyJWT, async (req, res) => {
    //rota para deletar produto
    const { id } = req.body
    try {
        var produto = await PedidoProduto.findOne({ where: { id_produto: id } })
        if (produto == null) {
            await Produto.destroy({
                where: {
                    id_produto: id
                }
            })
            res.redirect('/produto')
        } else {
            console.log('produto vinculado a pedido')
            res.redirect('/produto')
        }
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('erro ao deletar produto');
    }
})

module.exports = router;