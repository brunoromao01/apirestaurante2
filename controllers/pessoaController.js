const express = require('express')
const router = express.Router()
const Pessoa = require('../models/Pessoa')
const Endereco = require('../models/Endereco')
const Cidade = require('../models/Cidade')
const Uf = require('../models/Uf')
const Cargo = require('../models/Cargo')
const verifyJWT = require('./authenticate')

router.get('/pessoa', verifyJWT, async (req, res) => {
    const pessoas = await Pessoa.findAll({
        nest: true,
        include: {
            model: Endereco,
            required: true
        },
        raw: true
    })
    res.render('pessoa', { pessoas: pessoas })
})

router.get('/pessoa/edit/:id', verifyJWT, async (req, res) => {
    //rota para chamar tela de edição (recebe id e preenche os campos respectivos)
    var id = req.params.id
    try {
        var pessoa = await Pessoa.findByPk(id, {
            nest: true,
            raw: true
        })


        var endereco = {
            cep_endereco: '',
            logradouro_endereco: '',
            numero_endereco: '',
            cidade: {
                nome_cidade: ''
            }
        }
        var uf = {
            sigla_uf: ''
        }
        if (pessoa.id_endereco !== null) {
            endereco = await Endereco.findByPk(pessoa.id_endereco, {
                nest: true,
                include: {
                    model: Cidade,
                    required: true
                },
                raw: true
            })
            uf = await Uf.findByPk(endereco.cidade.id_uf, { raw: true })
        }
        var cargos = await Cargo.findAll({ raw: true })
        var ufs = await Uf.findAll({ raw: true })
        console.log(pessoa)
        res.render('edit', { pessoa: pessoa, endereco: endereco, estado: uf, cargos: cargos, ufs: ufs })
    } catch (error) {
        console.log(error)
    }
})

router.get('/pessoa/new', verifyJWT, async (req, res) => {
    //rota para carregar tela de novo cliente
    const ufs = await Uf.findAll()
    const cargos = await Cargo.findAll()
    res.render('new', { ufs: ufs, cargos: cargos })

})

router.post('/pessoa/create', verifyJWT, async (req, res) => { //cliente = "" (marcado check box) : undefined (sem marcar checkbox) 
    //rota para criar nova pessoa
    try {
        console.log(req.body)
        const cargo = req.body.cargo == 0 ? null : req.body.cargo
        const isCliente = req.body.cliente == undefined ? false : true
        const isFuncionario = req.body.funcionario == undefined ? false : true
        console.log(isCliente)
        var cidade = {
            nome_cidade: req.body.cidade,
            id_uf: Number(req.body.uf)
        }
        const novaCidade = await Cidade.create(cidade)
        var endereco = {
            cep_endereco: req.body.cep,
            logradouro_endereco: req.body.logradouro,
            numero_endereco: req.body.numero,
            complemento_endereco: req.body.complemento,
            id_cidade: Number(novaCidade.id_cidade),
        }
        const novoEndereco = await Endereco.create(endereco)

        var pessoa = {
            nome_pessoa: req.body.nome,
            cpf_pessoa: req.body.cpf,
            email_pessoa: req.body.email,
            celular_pessoa: req.body.telefone,
            isCustomer: isCliente,
            isEmployee: isFuncionario,
            id_endereco: Number(novoEndereco.id_endereco),
            id_cargo: cargo
        }
        const novaPessoa = await Pessoa.create(pessoa)

        res.redirect('/pessoa')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})

router.post('/pessoa/update', verifyJWT, async (req, res) => {
    //rota para atualizar (id da pessoa vem pelo body)
    console.log(req.body)
    console.log('req.body')
    try {
        const cargo = req.body.cargo == 0 ? null : req.body.cargo
        const isCliente = req.body.cliente == undefined ? false : true
        const isFuncionario = req.body.funcionario == undefined ? false : true
        const enderecoByPk = await Endereco.findByPk(req.body.idEndereco)
        var cidadeNova = {
            nome_cidade: req.body.cidade,
            id_uf: req.body.uf
        }
        const cidadeAtualizada = await Cidade.update(cidadeNova, {
            where: {
                id_cidade: enderecoByPk.id_cidade
            }
        })
        var endereco = {
            logradouro_endereco: req.body.logradouro,
            cep_endereco: req.body.cep,
            numero_endereco: req.body.numero,
            id_cidade: cidadeAtualizada.id_cidade,
        }
        await Endereco.update(endereco, {
            where: {
                id_endereco: req.body.idEndereco
            }
        })
        var pessoa = {
            nome_pessoa: req.body.nome,
            cpf_pessoa: req.body.cpf,
            celular_pessoa: req.body.telefone,
            isEmployee: isFuncionario,
            isCustomer: isCliente,
            id_endereco: req.body.idEndereco,
            id_cargo: cargo
        }

        await Pessoa.update(pessoa, {
            where: {
                id_pessoa: req.body.idPessoa
            }
        })
        res.redirect('/pessoa')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})

router.post('/pessoa/delete/', verifyJWT, async (req, res) => {
    //rota para deletar pessoa por id
    var id = req.body.id
    try {
        await Pessoa.destroy({
            where: {
                id_pessoa: id
            }
        })
        res.redirect('/pessoa')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})

module.exports = router;