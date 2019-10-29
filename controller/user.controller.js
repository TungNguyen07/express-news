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

module.exports.loginUser = async function(req, res, next){
    let hashedPassword = md5(req.body.password);
    let user = await userModel.find({username: req.body.username, 
        password: hashedPassword});
    if(!user.length){
        res.render('users/login', {
            errors: ["Tài khoản hoặc mật khẩu không chính xác!"],
            user: req.body,
        });
        return;
    }

    res.cookie('userId', user._id, {
        signed: true
    });
    res.render('index', {
        user: user
    });
}

module.exports.logout = function(req, res, next){
    res.clearCookie('userId');
    res.redirect('/');
}

