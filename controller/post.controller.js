module.exports.index = function(req, res, next){
    res.render('post/viewPost',{
        title: 'Express News'
    });
}

module.exports.write = function(req, res){
    res.render('post/newPost',{
        title: "Create Post"
    });
}

module.exports.listPost = function(req, res){
    let post;
    let errors = [];
    if(!post.length)
        errors.push('Empty!');
    res.render('post/managePost', {
        post: post,
        errors: errors,
        title: 'Manage Post'
    });
}

module.exports.post = function(req, res){
    console.log(req.body.ckeditor);
    console.log(typeof(req.body.ckeditor));
}