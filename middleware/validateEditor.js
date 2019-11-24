module.exports.checkEditor = function(req, res, next){
    let errors = [];
    if(!req.body.title)
        errors.push('Title is required!');
    if(!req.body.editor)
        errors.push('Content is required');
    if(errors.length){
        res.render('post/newPost',{
            errors: errors,
            title: req.body.title,
            editor: req.body.editor
        });
        return;
    }

    next();
}