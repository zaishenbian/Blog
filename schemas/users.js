var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //用户名
    username: String,
    //密码
    password: String
});

module.exports = userSchema;