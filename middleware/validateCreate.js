module.exports.validateCreate = function(req, res, next){
    let errors = [];
    if(!req.body.name)
        errors.push("Tên không được bỏ trống!");
    if(!req.body.email)
        errors.push("Email không được bỏ trống!");
    if(!req.body.username)
        errors.push("Tên đăng nhập không được bỏ trống!");
    if(!req.body.password)
        errors.push("Password không được bỏ trống!");
    if(errors.length){
        res.render('users/signup', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}