var express = require('express');
var router = express.Router();
var userModel = require('../models/User');

//统一返回格式
var responseData;
router.use(function(req, res, next){
	responseData = {
		code: 0,
		message: ''
	}
	next();
})

/**
 * 用户登录
 */
router.post('/admin/login', function(){

})

/**
 * 用户注册
 */
router.post('/admin/register', function(req, res, next){
	//用户名
	var username = req.body.username; 
	//密码
	var password = req.body.password;
	//确认密码
	var repassword = req.body.repassword;
	//用户名是否为空
	if(username == ''){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}
	//密码不能为空
	if(password == ''){
		responseData.code = 1;
		responseData.password = '用户名不能为空';
		res.json(responseData);
		return;
	}
	//两次输入密码不一致
	if(password != repassword){
		responseData.code = 1;
		responseData.message = '两次输入密码不一致';
		res.json(responseData);
		return;
	}
	//查找该用户名是否存在
	userModel.find({username: username}, function(err, data){
		console.log(arguments);
		if(data.length!=0){
			responseData.message = '用户名已存在';
			res.json(responseData);
		}else{
			//将用户名密码写入数据库
			userModel.create({
				username: username,
				password: password
			}, function(err, data){
				console.log(arguments);
				if(err){

				}else{
					//注册成功
					responseData.message = '注册成功';
					res.json(responseData);
				}
			});
		}
	});
})

router.get('/user', function(req, res, next){
  res.send('API-User');
})

module.exports = router;