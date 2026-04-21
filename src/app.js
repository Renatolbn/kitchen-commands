// 1. importa o express
import express, { json } from 'express'

// 2. cria o app
const app = express()

//middleware express json
app.use(json())

// 3. exporta
export default app