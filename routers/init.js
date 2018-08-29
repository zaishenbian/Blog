var userModel = require('../models/User');

function init(){
    //初始化管理员账户
    userModel.findOne({username: 'admin'}).then(result => {
        if(result){
            return;
        }else{
            return new userModel({
                username: 'admin',
                password: 'admin',
                isAdmin: true
            }).save()
        }
    }).then(result => {
        if(result){
            console.log('管理员账户初始化成功');
        }
    })
}

module.exports = init;