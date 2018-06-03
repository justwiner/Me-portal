var mongoose = require('mongoose');

var Praise_Schema = new mongoose.Schema({
  ip: String,
  time: {
    type: Date,
    default: Date.now()
  }
}, {
  versionKey: false
})

exports = module.exports = Praise_Schema