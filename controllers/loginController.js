const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const verifyJWT = require('./authenticate')
const { LocalStorage } = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')
require('dotenv').config()


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

router.get('/login', (req, res) => {
    localStorage.clear()
    res.render('login')
})

router.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
})

router.post('/novocadastro', async (req, res) => {
    const { login, senha } = req.body
    console.log(req.body)
    var salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(senha, salt)
    try {
        const newuser = await Usuario.create({
            login: login,
            senha: hash,
            logado: false
        })
        console.log(newuser)
        res.redirect('/login')
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao criar pessoa e/ou cliente.');
    }
})


router.post('/logar', async (req, res) => {
    const { login, senha } = req.body
    const usuario = await Usuario.findAll({ raw: true })
    const usuarioLocalizado = usuario.filter(user => user.login == login)
    if (usuarioLocalizado[0] == undefined || usuarioLocalizado[0] == null || usuarioLocalizado.lenght > 0) {
        res.redirect('/login')
    } else {
        const validarHash = bcrypt.compareSync(senha, usuarioLocalizado[0].senha)
        if (validarHash) {
            const token = jwt.sign({ id: usuarioLocalizado[0].id_usuario }, process.env.SECRET, { expiresIn: 500 })
            localStorage.setItem('token', token)
            // console.log('token ' + token)
            res.redirect('/pedido')
        } else {
            res.render('/login')
        }
    }
})




module.exports = router;