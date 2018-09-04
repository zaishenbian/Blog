var mongoose = require('mongoose');
var tagSchema = require('../schemas/tags');

var tagModel = mongoose.model('Tag', tagSchema);

module.exports = tagModel;