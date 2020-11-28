require('dotenv').config()

const PORT = process.env.PORT || 6006
const badApiUrl = 'https://bad-api-assignment.reaktor.com/'
// Available product categories in BadApi
const productCategories = ['shirts', 'jackets', 'accessories']
// Update interval for fetching info from BadApi (1 hour)
const updateInterval = 6000000

module.exports = {
  PORT,
  badApiUrl,
  productCategories,
  updateInterval
}