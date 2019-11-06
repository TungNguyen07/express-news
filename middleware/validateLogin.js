const userModel = require('../model/user.model');
const md5 = require('md5');

module.exports.Login = async function(req, res, next){
    let hashedPassword = md5(req.body.password);
    let user = await userModel.find({username: req.body.username, 
        password: hashedPassword});
    if(!user.length){
        res.render('users/login', {
            errors: ["Username or Password is wrong!"],
            values: req.body,
        });
        return;
    }
    next();
}