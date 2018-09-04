var express = require('express');
var router = express.Router();
var userModel = require('../models/User');
var tagModel = require('../models/Tag');

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
 * 后台管理系统接口(需要用户登录并且为管理员账号)
 */
router.use(function(req, res, next){
	if(req.session.user&&req.session.user.isAdmin){
		next();
	}else{
		res.redirect('/admin/login');
	}
})

/**
 * 用户列表
 */
router.post('/users', function(req, res){
	var limit = Number(req.body.limit);
	var skip = Number(req.body.page)-1;
	userModel.find().skip(skip*limit).limit(limit).then(result => {
		if(result){
			responseData.message = result;
			return userModel.estimatedDocumentCount();
		}else{
			responseData.code = 1;
			responseData.count = 0;
			responseData.message = '数据库查询错误，请重试';
			res.send(responseData);
		}
	}).then((count) => {
		responseData.count = count;
		res.send(responseData);
	})
})

/**
 * 标签列表
 */
router.post('/tags', function(req, res){
	var limit = Number(req.body.limit);
	var skip = Number(req.body.page)-1;
	tagModel.find().skip(skip*limit).limit(limit).then(result => {
		if(result){
			responseData.message = result;
			return tagModel.estimatedDocumentCount();
		}else{
			responseData.code = 1;
			responseData.count = 0;
			responseData.message = '数据库查询错误，请重试';
			res.send(responseData);
		}
	}).then((count) => {
		responseData.count = count;
		res.send(responseData);
	})
})

/**
 * 修改后台管理系统密码
 */
router.post('/changePwd', function(req, res){
  //用户名
	var username = req.session.user.username; 
	//旧密码
  var oldPassword = req.body.password;
  //新密码
	var newPassword = req.body.newPassword;
	//确认密码
	var rePassword = req.body.rePassword;
	//旧密码是否为空
	if(oldPassword == ''){
		responseData.code = 1;
		responseData.message = '原始密码不能为空';
		res.json(responseData);
		return;
	}
	//新密码不能为空
	if(newPassword == ''){
		responseData.code = 1;
		responseData.password = '新密码不能为空';
		res.json(responseData);
		return;
	}
	//两次输入密码不一致
	if(newPassword != rePassword){
		responseData.code = 1;
		responseData.message = '两次输入密码不一致';
		res.json(responseData);
		return;
  }
  //查询数据库
  userModel.findOne({
    username: username,
    password: oldPassword
  }).then(result => {
    if(result){
      return userModel.updateOne({
        username: username
      },{
        $set: {
          password: newPassword
        }
      })
    }else{
      responseData.code = 1;
      responseData.message = '原始密码密码错误';
      res.send(responseData);
      return;
    }
  }).then(function(result){
    if(result){
      responseData.message = '密码修改成功';
      res.send(responseData);
    }else{
      responseData.code = 1;
      responseData.message = '密码修改失败';
      res.send(responseData);
    }
  })
})

module.exports = router;