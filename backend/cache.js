const config = require('./utils/config')

const cache = {test: 'foo'}

const set = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now()
  }
}

const get = (key) => cache[key]

module.exports = {
  set,
  get,
}