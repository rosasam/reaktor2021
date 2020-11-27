require('dotenv').config()
const express = require('express')
const cache = require('./cache')
const config = require('./utils/config')
const productsRouter = require('./controllers/products')

const app = express()

// Parse incoming requests with JSON payloads
app.use(express.json())
// Routers
app.use('/products', productsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})