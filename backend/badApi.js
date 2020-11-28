const axios = require('axios')
const config = require('./utils/config')

const callBadApi = async (endpoint) => {
  try {
    // TODO handle 404:s for manufacturers that don't exist
    const url =`${config.badApiUrl}${endpoint}`
    console.log('calling ', url)
    const conf = {headers: {'x-force-error-mode': 'all'}}
    const response = await axios.get(url)
    const data = response.data
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
  const data = await callBadApi(`products/${category}`)
  return data
}

const getAvailabilities = async (manufacturer) => {
  let data = await callBadApi(`availability/${manufacturer}`)
  // Sometimes, no data is returned :)
  const max_retries = 3
  let retries = 0

  while (!Array.isArray(data.response)) {
    if (retries >= max_retries) {
      return []
    }
    console.log(`No data received, trying again (try ${retries+1}/${max_retries})`)
    data = await callBadApi(`availability/${manufacturer}`)
    retries++
  }
  return data.response
}

const getAll = async () => {
  let products = []
  const manufacturers = new Set()

  // Fetch products
  for (category of config.productCategories) {
    const data = await getProducts(category)
    data.forEach(product => {
      manufacturers.add(product.manufacturer)
    })
    products = products.concat(data)
  }

  // Fetch availabilities based on found manufacturers
  // Assign them to an object with the product id as key
  let allAvailabilities = {}
  for (manufacturer of [...manufacturers]) {
    const availabilities = await getAvailabilities(manufacturer)
    availabilities.forEach(availability => {
      // TODO: Better parsing...
      // "Parses" XML and extracts the "INSTOCKVALUE" value.
      // Assumes that the XML structure never changes.
      const status = availability.DATAPAYLOAD.split('>').flatMap(line => line.split('<'))[4]
      allAvailabilities[availability.id.toLowerCase()] = status
    })
  }

  // Assign availability info to products
  products = products.map(product => ({
    ...product,
    availability: allAvailabilities[product.id]
  }))
  return products
}

module.exports = {
  getProducts,
  getAvailabilities,
  getAll,
}