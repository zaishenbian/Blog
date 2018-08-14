var express = require('express');
var router = express.Router();

//登录注册页面路由
router.get('/', function(req, res, next){
    res.render('admin/index');
})

router.get('/login', function(req, res, next){
    res.render('admin/login');
})

router.get('/user', function(req, res, next){
    res.send('Admin-User');
})

module.exports = router;