let mongoose = require('mongoose')
let Schema = mongoose.Schema

let catalogSchema = new Schema({
    // 目录名称
    name: String,
    // 创建时间
    createTime: {
        type: Date,
        default: localDate()
    },
    // 代码块列表
    codeList: [{
        type: Schema.Types.ObjectId,
        ref: 'Code'
    }]
})

function localDate(){
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
}

module.exports = catalogSchema