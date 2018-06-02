let Music163 = ( () => {
  const Worm = require('../tool/worm')
  let worm = new Worm()
  class Music163 {
    async filterPlayList (id) {
      worm.url = `http://music.163.com/api/playlist/detail?id=${id}&updateTime=-1`
      const dataStr = await worm.grab()
      const data = JSON.parse(dataStr).result.tracks
      let result = []
      data.forEach(element => {
        result.push({
          name: element.name,
          id: element.id
        })
      });
      return result
    }
  }
  return Music163
} )()

exports = module.exports = Music163