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
 * 需要用户登录的接口
 */
router.use(function(req, res, next){
	if(req.session.user){
		next();
	}else{
		responseData.code = 1;
		responseData.message = '用户未登录';
		res.send(responseData);
	}
})

module.exports = router;