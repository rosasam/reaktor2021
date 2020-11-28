const productsRouter = require('express').Router()
const cache = require('../cache')
const badApi = require('../badApi')

productsRouter.get('/', async (request, response) => {
  const products = cache.get('products')
  response.json({
    data: products.data.slice(0, 10),
    timestamp: products.timestamp,
    size: products.data.length
  })
})

productsRouter.post('/', async (request, response) => {
  const data = await badApi.getAll()
  cache.set('products', data)
  response.json(cache.get('products'))
})

module.exports = productsRouter