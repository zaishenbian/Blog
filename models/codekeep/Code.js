let mongoose = require('mongoose')
let codeSchema = require('../../schemas/codekeep/code')

module.exports = mongoose.model('Code', codeSchema)