require('./connent')
const mongoose = require('mongoose')

const Praise_Schema = require('./schemas/praise')
const Praise = mongoose.model("praise", Praise_Schema);
exports.Praise = Praise;