//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
var cons = require('consolidate');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载数据库模块
var mongoose = require('mongoose');
//加载express-session模块
var session = require('express-session');
//加载connect-mongo模块
var MongoStore = require('connect-mongo')(session);
//记载初始化模块
var init = require('./routers/init');

//创建app应用 => NodeJS http.createServer();
var app = express();

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀    第二个参数：表示用于解析处理模板内容的方法
app.engine('html', cons.swig);
//设置模板文件目录，第一个参数必须是views，第二个参数是文件目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须死view engine，第二个参数必须和模板文件后缀一致
app.set('view engine', 'html');

//在开发过程中，需要取消模板的缓存
swig.setDefaults({cache: false});

//bodyParser设置
app.use(bodyParser.urlencoded({extended: true}));

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回__dirname + '/public'目录下的文件
app.use('/public', express.static(__dirname + '/public'));

//初始化
init();

//设置session
app.use(session({
    secret: 'blog2018',
    cookie: { maxAge: 1000*60*60 },
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

/**
 * 根据不同的功能划分模块
 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));
app.use('/codekeepApi', require('./routers/codekeep'))

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true},function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        //监听http请求
        app.listen(80);
    }
});

//监听http请求
// app.listen(8080);