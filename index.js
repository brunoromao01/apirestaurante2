const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./database/db')
const pessoaController = require('./controllers/pessoaController')
const produtoController = require('./controllers/produtoController')
const pedidoController = require('./controllers/pedidoController')
const loginController = require('./controllers/loginController')
const jwt = require('jsonwebtoken')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.set('view engine', 'ejs')
app.use(express.static('public'))

connection.authenticate().
    then(() => console.log('DB mysql rodando...'))
    .catch(err => console.log(err))

app.use('/', pessoaController)
app.use('/', produtoController)
app.use('/', pedidoController)
app.use('/', loginController)


app.listen(4000, err => {
    if (err) console.log(err)
    else console.log('Server is running...')
})