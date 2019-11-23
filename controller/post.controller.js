const postModel = require('../model/post.model');

//show newest post
module.exports.index = async function(req, res, next){
    let regex = /<img.*?src="(.*?)"/;
    //get newest post
    let values = [];
    let data = await postModel.find({status: true}).sort({created: 1}).limit(10);
    data.forEach(item => item.firstImage = regex.exec(item.content)[1]);
    res.render('post/viewPost', {
        post: data,
        title: 'Express News',
        active: 'Home',
    });
    
}

//show newest post follow category
module.exports.indexCategory = async function(req, res){
    let active = req.params.active;
    let regex = /<img.*?src="(.*?)"/;
    active = active.charAt(0).toUpperCase() + active.slice(1);
    let data = await postModel.find({category: active, status: true}).sort({created: 1}).limit(10);
    data.forEach(item => item.firstImage = regex.exec(item.content)[1]);
    res.render('post/viewPost',{
        title: active,
        active: active,
        post: data,
    });
    //console.log('length of post: ',post.length);
    
}

//Insert post
module.exports.post = async function(req, res){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    
    let created = mm + '/' + dd + '/' + yyyy;
    postModel.create({
        title: req.body.title,
        category: req.body.category,
        author: res.locals.user['name'],
        created: created,
        content: req.body.editor
    });
    res.redirect('/post/write-news');
}

//write new post
module.exports.write = function(req, res){
    res.render('post/newPost',{
        title: "Create Post"
    });
}


//List of unread post
module.exports.listPost = async function(req, res){
    let data = await postModel.find({status: false})
    let errors = [];
    if(!post.length){
        errors.push('Empty!');
    }
    res.render('post/managePost', {
        title: 'Manage Post',
        post: data,
        errors: errors,
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

//approve post
module.exports.approvePost = function(req, res){
    let id = req.params.id;
    let condition = {_id: id};
    let query = {$set: {status: true}};
    postModel.update(condition, query, function(err, res){
        if(err) throw err;
        console.log('Approve successfully!');
    });
    res.redirect('/post/manage-post');
}

//deny post
module.exports.denyPost = function(req, res){
    let id = req.params.id;
    let condition = {_id: id};
    postModel.remove(condition, function(err, res){
        if(err) throw err;
        console.log('Remove successfully!');
    });
    res.redirect('/post/manage-post');
}