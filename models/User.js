var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;