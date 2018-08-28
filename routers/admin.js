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

router.get('/user', function(req, res, next){
    res.send('Admin-User');
})

//文章管理
router.get('/articles', function(req, res, next){
    res.render('admin/articles');
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