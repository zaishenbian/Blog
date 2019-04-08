let mongoose = require('mongoose')
let catalogSchema = require('../../schemas/codekeep/catalog')

module.exports = mongoose.model('Catalog', catalogSchema)