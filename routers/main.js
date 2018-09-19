var express = require('express');
var router = express.Router();
var tagModel = require('../models/Tag');
var articleModel = require('../models/Article');
var initalData = require('../views/config/render.conf');

//判断当前哪个导航被激活的中间件
router.use('*', function(req, res, next){
    initalData.active = req.url;
    next();
})

//首页路由
router.get('/', function(req, res, next){
    //获取首页文章列表
    articleModel.find({}).populate('tags').then((docs) => {
        initalData.articles = docs;
        res.render('./main/index', initalData);
    })
})

router.get('/user', function(req, res, next){
    res.send('User', initalData);
})

module.exports = router;

