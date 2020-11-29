require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path');
const cache = require('./cache')
const config = require('./utils/config')
const productsRouter = require('./controllers/products')
const badApi = require('./badApi')

const app = express()

// Initial fetch of data when server starts
badApi.getAll().then((data) => {
  cache.set('products', data)
})

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
// Parse incoming requests with JSON payloads
app.use(express.json())
// Routers
app.use('/products', productsRouter)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
  setInterval(() => {
    console.log('Updating data')
    badApi.getAll().then((data) => {
      cache.set('products', data)
    }) 
  }, config.updateInterval);
})