var crypto = require('crypto')
var userModel = require('../models/User');

function init(){
    var initialUser = {
        isAdmin: true,
        username: 'admin',
        password: cryptPwd('admin')
    }
    //初始化管理员账户
    userModel.findOne({
        username: initialUser.username,
        password: initialUser.password
    }).then(result => {
        if(result){
            return;
        }else{
            return new userModel(initialUser).save()
        }
    }).then(result => {
        if(result){
            console.log('管理员账户初始化成功');
        }
    })
}

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex')
}

module.exports = init;