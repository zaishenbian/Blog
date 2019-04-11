var express = require('express');
var router = express.Router();
var tagModel = require('../models/Tag');
var articleModel = require('../models/Article');
var marked = require('marked');
var moment = require('moment')
var initalData = {};

//判断当前哪个导航被激活的中间件
router.use('*', function(req, res, next){
    initalData = {...require('../views/config/render.conf')};
    tagModel.find({}).then(docs => {
        initalData.leftSide[2].children = [];
        docs.filter(tag => tag.name!='我的足迹').forEach(tag => {
            initalData.leftSide[2].children.push({
                title: tag.name,
                icon: 'fa-tag',
                url: `/tags/${tag._id}`
            })
        })
        initalData.active = req.originalUrl;
        next();
    })
})

//首页路由
router.get('/', function(req, res, next){
    //获取首页文章列表
    articleModel.find({}).populate('tags').sort({time: -1}).then(docs => {
        // 日期格式化
        docs = docs.map(doc => {
            let time = new Date(doc.time.getTime() - 8*60*60*1000)
            doc.createTime = moment(time).format('YYYY-MM-DD HH:mm:ss') + ''
            return doc
        })
        initalData.articles = docs;
        res.render('./main/index', initalData);
    })
})

//前端技术文章列表
router.get('/web', function(req, res){
    tagModel.find({name: {$nin: ['我的足迹']}}, {name: 0}).then(tags => {
        tags = tags.map(tag => tag._id);
        return articleModel.find({tags: {$in: tags}}).populate('tags').sort({time: -1});
    }).then(docs => {
        // 日期格式化
        docs = docs.map(doc => {
            let time = new Date(doc.time.getTime() - 8*60*60*1000)
            doc.createTime = moment(time).format('YYYY-MM-DD HH:mm:ss') + ''
            return doc
        })
        initalData.articles = docs;
        res.render('./main/index', initalData);
    })
})

//根据标签获取文章列表
router.get('/tags/:id', function(req, res){
    var _id = req.params.id;
    articleModel.find({tags: _id}).populate('tags').sort({time: -1}).then(docs => {
        // 日期格式化
        docs = docs.map(doc => {
            let time = new Date(doc.time.getTime() - 8*60*60*1000)
            doc.createTime = moment(time).format('YYYY-MM-DD HH:mm:ss') + ''
            return doc
        })
        initalData.articles = docs;
        res.render('./main/index', initalData);
    })
})

//文章详情页
router.get('/article/:id', function(req, res){
    var _id = req.params.id;
    articleModel.findOneAndUpdate({_id: _id}, {$inc: {views: 1}}).populate('tags').then(doc => {
        // 日期格式化
        let time = new Date(doc.time.getTime() - 8*60*60*1000)
        doc.createTime = moment(time).format('YYYY-MM-DD HH:mm:ss') + ''
        doc.content = marked(doc.content);
        initalData.article = doc;
        res.render('./main/index', initalData);
    })
})

//我的足迹列表
router.get('/track', function(req, res){
    tagModel.find({name: '我的足迹'}, {name: 0}).then(tags => {
        return articleModel.find({tags: tags}).populate('tags').sort({time: -1});
    }).then(docs => {
        // 日期格式化
        docs = docs.map(doc => {
            let time = new Date(doc.time.getTime() - 8*60*60*1000)
            doc.createTime = moment(time).format('YYYY-MM-DD HH:mm:ss') + ''
            return doc
        })
        initalData.articles = docs;
        res.render('./main/index', initalData);
    })
})

router.get('/user', function(req, res, next){
    res.send('User', initalData);
})

module.exports = router;

