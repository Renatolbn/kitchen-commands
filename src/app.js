// 1. importa o express
const express = require('express')

// 2. cria o app
const app = express()

//middleware express json
app.use(express.json())

// 3. exporta
module.exports = app