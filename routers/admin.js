var express = require('express');
var router = express.Router();

//登录注册页面路由
router.get('/login', function(req, res, next){
    req.session.user = null;
    res.render('admin/login');
})

router.use(function(req, res, next){
    if(req.session.user&&req.session.user.isAdmin){
        next();
    }else{
        res.redirect('/admin/login');
    }
})

//首页路由
router.get('/', function(req, res, next){
    res.render('admin/index');
})

router.get('/users', function(req, res, next){
    res.render('admin/users');
})

//文章管理
router.get('/articles', function(req, res, next){
    res.render('admin/articles');
})

//文章新增与编辑
router.get('/articleEdit', function(req, res){
    var code = req.query.code;
    if(code == 0){
        //新增
        res.render('admin/articleEdit', {type: '新增'});
    }else if(code == 1){
        //编辑
        res.render('admin/articleEdit', {type: '编辑'});
    }
})

//标签管理
router.get('/tags', function(req, res, next){
    res.render('admin/tags');
})

//评论管理
router.get('/comments', function(req, res, next){
    res.render('admin/comments');
})

//修改密码
router.get('/changePwd', function(req, res, next){
    res.render('admin/changePwd');
})

module.exports = router;