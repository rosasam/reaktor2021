const productsRouter = require('express').Router()
const { cache } = require('../cache')

productsRouter.get('/', async (request, response) => {
  response.json(cache)
})

module.exports = productsRouter