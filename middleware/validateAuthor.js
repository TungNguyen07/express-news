const userModel = require('../model/user.model');

module.exports.checkAuthor = async function(req, res, next){
    let errors = [];
    if(!res.locals.user){
        errors.push('You must login to view this site!');
        res.render('error',{
            messages: errors
        });
        return;
    }

    let id = res.locals.user._id;
    let user = await userModel.findById(id);
    
    if(user.permission < 1){
        errors.push('You do not have permission to view this site!');
        res.render('error',{
            messages: errors
        });
        return;
    }

    next();
}