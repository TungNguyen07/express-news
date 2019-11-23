const userModel = require('../model/user.model');
const md5 = require('md5');

//Create user
module.exports.create = function(req, res, next){
    res.render('users/signup', {title: 'Đăng ký'});
}

module.exports.postCreateUser = function(req, res, next){
    req.body.password = md5(req.body.password);
    userModel.create(req.body);
    res.redirect('login');
}

//Login
module.exports.login = function(req, res, next){
    res.render('users/login',{title: 'Đăng nhập'});
}

module.exports.loginUser = async function(req, res, next){
    let user = await userModel.find({username: req.body.username});
    res.cookie('userId', user[0]._id, {
        signed: true
    });
    res.redirect('/');
}

//Logout
module.exports.logout = function(req, res, next){
    res.clearCookie('userId');
    res.redirect('/');
}

//Change Password
module.exports.changePassword = function(req, res, next){
    res.render('users/changePassword');
}

module.exports.postChangePassword = function(req, res, next){
    let id = req.params.id;
    let condition = {_id: id};
    let password = md5(req.body.newPassword);
    let query = {$set:{password: password}};
    userModel.updateOne(condition, query, function(err, res){
        if(err) throw err;
        console.log('Change password successfully!');
    });
    res.redirect('/users/info/change-password/'+id);
}

//User's infomation
module.exports.info = async function(req, res, next){
    let id = req.params.id;
    let user = await userModel.find({_id: id});
    res.render('users/info', {
        values: user[0]
    });
}

module.exports.changeInfo = async function(req, res, next){
    let id = req.params.id;
    let query = {$set: {name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email}};
    let condition = {_id: id};
    userModel.updateOne(condition, query, function(err, res){
        if(err) throw err;
        console.log('One document updated!');
    });
    res.redirect('/users/info/'+id);
}

//List users
module.exports.listUsers = async function(req, res){
    let users = await userModel.find({});
    res.render('users/listUsers',{
        users: users
    });
    //console.log(users.length);
}

//Search Users
module.exports.searchUsers = async function(req, res){
    let query = req.query.q;
    let users;
    if(query)
        users =await userModel.find({name: {$regex: new RegExp(query)}});
    else
        res.redirect('/users/list-users');
    let errors = [];
    if(!users.length)
        errors.push('Not found!');
    res.render('users/listUsers',{
        users: users,
        errors: errors,
        q: query
    });
}

//Upgrade permission
module.exports.upgradePermission = function(req, res){
    let id = req.params.id;
    let permission = req.body.permission;
    let condition = {_id: id};
    let query = {$set: {permission: permission}};
    userModel.updateOne(condition,query, function(err, res){
        if(err) throw err;
        console.log("Change permission sucessfully!");
    });
    res.redirect('/users/list-users');
} 

//Delete user
module.exports.deleteUser = function(req, res){
    let id = req.params.id;
    let condition = {_id: id};
    userModel.remove(condition, function(err, res){
        if(err) throw err;
        console.log("Delete user sucessfully!");
    });
    res.redirect('/users/list-users');
}
