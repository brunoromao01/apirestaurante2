const jwt = require('jsonwebtoken')
const { LocalStorage } = require('node-localstorage')
const localStorage = new LocalStorage('./scratch')

const verifyJWT = (req, res, next) => {
    const token = localStorage.getItem('token')
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.log('sem autorização')
            return res.status(401).end()
        }    
        next()
    })
}

module.exports = verifyJWT