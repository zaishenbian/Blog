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
router.post('/admin/login', function(req, res){
	//用户名
	var username = req.body.username; 
	//密码
	var password = req.body.password;
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
	//查询数据库，验证用户名密码是否匹配
	userModel.findOne({
			username: username, 
			password: password
		}).then(result => {
			if(result){
				//判断是否是管理员
				if(result.isAdmin){
					var isAdmin = true;
					responseData.message = '管理员登录成功！';
				}else{
					var isAdmin = false;
					responseData.message = '普通用户登录成功！';
					responseData.code = 2;
				}
				req.session.user = {
					username: username,
					isAdmin: isAdmin
				}
			}else{
				responseData.code = 1;
				responseData.message = '用户名或密码错误！';
			}
			res.send(responseData);
		}
	)
})

/**
 * 用户注册
 */
router.post('/admin/register', function(req, res){
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
		responseData.password = '密码不能为空';
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
		if(data.length!=0){
			responseData.code = 1;
			responseData.message = '用户名已存在';
			res.json(responseData);
		}else{
			//将用户名密码写入数据库
			userModel.create({
				username: username,
				password: password
			}, function(err, data){
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

/**
 * 博客页面接口
 */
router.use('/', require('./mainApi'));

/**
 * 后台管理接口
 */
router.use('/admin', require('./adminApi'));

router.get('/user', function(req, res, next){
  res.send('API-User');
})

module.exports = router;