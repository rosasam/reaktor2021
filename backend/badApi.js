const axios = require('axios')
const config = require('./utils/config')

const callBadApi = async (endpoint) => {
  try {
    // TODO handle 404:s for manufacturers that don't exist
    const response = await axios.get(`${config.badApiUrl}${endpoint}`)
    const data = JSON.parse(response.data)
    if (data.length === 0) {
      console.log('No data received')
    }
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getProducts = async (category) => {
  if (!config.productCategories.includes(category)) {
    // error handling
    console.log('Unknown product category')
    return []
  }
  const data = await callBadApi(category)
  return data
}

const getAvailabilities = async (manufacturer) => {
  const data = await callBadApi(manufacturer)
  return data.response
}

const getAll = async () => {
  const products = {}
  const manufacturers = new Set()

  // Get all products
  config.productCategories.forEach(category => {
    const items = getProducts(category)
    const itemsObj = {}
    // Save (unique) names of all manufacturers
    items.forEach(item => {
      manufacturers.add(manufacturer)
      itemsObj[item.id] = item
    })
    products[category] = itemsObj
  })

  // Get product availabilities from all manufacturers that were listed in products
  let availabilities = manufacturers
    .flatMap(manufacturer => (
      getAvailabilities(manufacturer)
    ))
    // Parse availability data to match the format of products
    .map(availability => {
      // TODO: Better parsing...
      // "Parses" XML and extracts the "INSTOCKVALUE" value.
      // Assumes that the XML structure never changes.
      const status = availability.DATAPAYLOAD.split('>').flatMap(line => line.split('<'))[4]
      return {
        id: availability.id.toLowerCase,
        availability: status
      }
    })
}

module.export = {
  getProducts,
  getAvailabilities,
}

 // "derp", "abiplos", "nouke", "reps"