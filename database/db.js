const Sequelize = require('sequelize')
require('dotenv').config()

const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT,
    define: {
        timestamps: false
    }})

module.exports = connection