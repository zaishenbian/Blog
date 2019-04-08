let mongoose = require('mongoose')
let Schema = mongoose.Schema

let codeSchema = new Schema({
    // 代码块名称
    name: String,
    // 创建时间
    createTime: {
        type: Date,
        default: localDate()
    },
    // 代码块描述
    description: {
        type: String,
        default: ''
    },
    // 代码块内容
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

module.exports = codeSchema