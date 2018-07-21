var express = require('express');
var router = express.Router();
var initalData = require('../views/config/render.conf');

//判断当前哪个导航被激活的中间件
router.use('*', function(req, res, next){
    initalData.active = req.url;
    next();
})

//首页路由
router.get('/', function(req, res, next){
    res.render('./main/index', initalData);
})

router.get('/user', function(req, res, next){
    res.send('User', initalData);
})

module.exports = router;

