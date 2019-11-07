const userModel = require('../model/user.model');
const md5 = require('md5');

module.exports.create = async function(req, res, next){
    let errors = [];
    let usedUsername = await userModel.find({username: req.body.username});
    let usedEmail = await userModel.find({email: req.body.email});
    if(!req.body.name)
        errors.push("Name is required!");
    if(!req.body.email)
        errors.push("Email is required!");
    if(usedEmail.length)
        errors.push('Email is not available!');
    if(!req.body.username)
        errors.push("Username is required!");
    if(usedUsername.length)
        errors.push('Username is not available!');
    if(!req.body.password)
        errors.push("Password is required!");
    if(!req.body.phone)
        errors.push('Phone is required!');
    if(errors.length){
        res.render('users/signup', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}

module.exports.editInfo = function(req,res, next){
    let errors = [];
    let id = req.params.id;
    if(!req.body.name)
        errors.push('Name is required!');
    if(!req.body.email)
        errors.push('Email is required!');
    if(!req.body.phone)
        errors.push('Phone is required!');
    if(errors.length){
        res.render('users/info',{
            errors: errors,
            values: req.body
        })
        return;
    }
    next();
        
}

module.exports.changePassword = async function(req, res, next){
    let errors = [];
    let id = req.params.id;
    let password = md5(req.body.currentPassword);
    let user = await userModel.find({_id: id, password: password});
    if(!user.length)
        errors.push("Current password is wrong!");
    if(!req.body.currentPassword)
        errors.push('Current password is required!');
    if(!req.body.newPassword)
        errors.push("New password is required!");
    if(errors.length){
        res.render('users/changePassword',{
            errors: errors
        });
        return;
    }
    next();
}

module.exports.getPermission = async function(req, res, next){
    let errors = [];
    let id //sessionId
    let permission = userModel.find({_id: id},{permission: 1});
    if(permission<2)
        errors.push("You do not have permission to see list users!");
    if(errors.length){
        res.render('error',{
            messageS: errors
        });
        return;
    }
    next();
}