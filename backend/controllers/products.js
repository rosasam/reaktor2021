const productsRouter = require('express').Router()
const cache = require('../cache')
const badApi = require('../badApi')
const config = require('../utils/config')

productsRouter.get('/', async (request, response) => {
  const data = cache.get('products')
  if (data === undefined) {
    return response.status(500).json({ error: 'Loading data, try again later' }) 
  }
  response.status(200).json(data)
})

productsRouter.get('/:category', async (request, response) => {
  const category = request.params.category
  if (!config.productCategories.includes(category)) {
    return response.status(404).json({ error: 'Category does not exist' })
  }
  const data = cache.get('products')
  if (data === undefined) {
    return response.status(500).json({ error: 'Loading data, try again later' }) 
  }
  response.status(200).json(data.data[category])
})

productsRouter.post('/', async (request, response) => {
  const data = await badApi.getAll()
  cache.set('products', data)
  response.status(200).json(cache.get('products'))
})

module.exports = productsRouter