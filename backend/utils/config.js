require('dotenv').config()

const PORT = process.env.PORT || 6006
const badApiUrl = 'https://bad-api-assignment.reaktor.com/'
// Available product categories in BadApi
const productCategories = ['shirts', 'jackets', 'accessories']

module.exports = {
  PORT,
  badApiUrl,
  productCategories,
}