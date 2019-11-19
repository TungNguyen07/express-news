const postModel = require('../model/post.model');
const FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor');

//show newest post
module.exports.index = function(req, res, next){

    //get newest post
    
    res.render('post/viewPost',{
        title: 'Express News',
        active: 'Home',

    });
}

//show newest post follow category
module.exports.indexCategory = function(req, res){
    let active = req.params.active;
    active = active.charAt(0).toUpperCase() + active.slice(1);
    res.render('post/viewPost',{
        title: active,
        active: active,
    
    });
    console.log(req.params.active);
}

//Insert post
module.exports.post = async function(req, res){
    FroalaEditor.Image.upload(req, 'public/images/', function(err, data) {
        // Return data.
        if (err) {
          return res.send(JSON.stringify(err));
        }
        res.send(data);
    });
}

//write new post
module.exports.write = function(req, res){
    res.render('post/newPost',{
        title: "Create Post"
    });
}


//List of unread post
module.exports.listPost = function(req, res){
    let post = [];
    let errors = [];
    if(!post.length){
        errors.push('Empty!');
        res.render('post/managePost', {
            errors: errors
        });
    }
    res.render('post/managePost', {
        post: post,
        errors: errors,
        title: 'Manage Post'
    });
}

//Post with view most
module.exports.viewMost = async function(req, res){
    //db.getCollection('users').find().sort({"phone":-1}).limit(3);
    let category = req.params.active;
    let condition = {category: category};
    let query = {view: -1};
    let postViewMost = await postModel.find(condition).sort(query).limit(5);
    //should be in indexCategory
}

