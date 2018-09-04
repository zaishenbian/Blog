var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  //标签名称
  name: String
})

module.exports = tagSchema;