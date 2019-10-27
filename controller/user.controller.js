const userModel = require('../model/user.model');
const md5 = require('md5');

module.exports.create = function(req, res, next){
    res.render('users/signup', {title: 'Đăng ký'});
}

module.exports.login = function(req, res, next){
    res.render('users/login',{title: 'Đăng nhập'});
}

module.exports.postCreateUser = function(req, res, next){
    req.body.password = md5(req.body.password);
    userModel.create(req.body);
    res.redirect('login');
}

