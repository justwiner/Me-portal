const http = require('http')

let Worm = ( function () {
  class Worm {
    constructor (url) {
      this.url = url
    }
    grab () {
      let promise = new Promise((resolve, reject) => {
        let result = ''
        http.get(this.url, res => {
          res.on('data', data => result += data)
          res.on('end', () => resolve(result))
        }).on('error', () => console.log(error))
      })
      return promise
    }
  }
  return Worm
} )()

exports = module.exports = Worm