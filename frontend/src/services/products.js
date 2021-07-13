import axios from 'axios'

const baseUrl = 'rocky-citadel-65023.herokuapp.com/products/'

const getProductsByCategory = async (category) => {
  const categories = ['shirts', 'jackets', 'accessories']
  if (!categories.includes(category)) {
    // error handling
    return undefined
  }
  const response = await axios.get(`${baseUrl}${category}`)
  return response.data
}

const getProducts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateProducts = async () => {
  const response = await axios.post(baseUrl)
  return response.data
}

export default {
  getProducts,
  getProductsByCategory,
  updateProducts,
}
