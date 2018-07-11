var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index');
})

router.get('/user', function(req, res, next){
    res.send('User');
})

module.exports = router;

