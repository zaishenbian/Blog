var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  //文章名称
  name: String,
  //时间
  time: {
    type: Date,
    default: localDate()
  },
  //阅读量
  views: {
    type: Number,
    default: 0
  },
  //作者
  author: {
    type: String,
    default: '珍惜你的微笑'
  },
  //简介
  description: {
    type: String,
    default: ''
  },
  //关联字段-所属标签（可多选）
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  //内容
  content: {
    type: String,
    default: ''
  }
})

function localDate(){
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}

module.exports = articleSchema;