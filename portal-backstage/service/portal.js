let Portal = ( () => {
  const Praise = require('../db/mongoose-db').Praise
  class Portal {
    static async addPraise (ip) {
      const result = await Praise.findOne({ip})
      if ( result != null ) {
        return false
      } else {
        await Praise.create({ip})
        return true
      }
    }
    static async getPramiseNum () {
      const num = await Praise.count()
      return num
    }
  }
  return Portal
})()

exports = module.exports = Portal