const postModel = require('../model/post.model');

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str.toLowerCase().replace(/ /g,'+');
}

function getFirstImageandAndDelete(data){
    let regex = /<img.*?src="(.*?)"/;
    data.forEach(item => item.firstImage = regex.exec(item.content)[1]);
    data.forEach(item => item.url = xoa_dau(item.title));
    return data;
}


//show newest post
module.exports.index = async function(req, res, next){
    
    //get newest post
    let data = await postModel.find({status: true}).sort({created: 1}).limit(10);
    data = getFirstImageandAndDelete(data);

    let viewMost = data.sort(function(a,b){
        return b.view - a.view
    }).slice(0,4);

    res.render('post/viewPost', {
        post: data,
        title: 'Express News',
        active: 'Home',
        most: viewMost
    });
    
}

//show newest post follow category
module.exports.indexCategory = async function(req, res){
    let active = req.params.active;
    let data = await postModel.find({category: active, status: true}).sort({created: 1}).limit(10);
    data = getFirstImageandAndDelete(data);

    let viewMost = data.sort(function(a,b){
        return b.view - a.view;
    }).slice(0,4);

    
    active = active.charAt(0).toUpperCase() + active.slice(1);

    res.render('post/viewPost',{
        title: active,
        active: active,
        post: data,
        most: viewMost
    });
    //console.log('length of post: ',post.length);
    
}

//Insert post
module.exports.post = async function(req, res){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hour = today.getUTCHours() + 7;
    let minute = today.getUTCMinutes();
    let second = today.getUTCSeconds();
    
    let created = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + minute + ':' + second;
    // let created = new Date();
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
    if(!data.length){
        errors.push('Empty!');
    }
    res.render('post/managePost', {
        title: 'Manage Post',
        post: data,
        errors: errors,
    });
}

//approve post
module.exports.approvePost = function(req, res){
    let id = req.params.id;
    let condition = {_id: id};
    let query = {$set: {status: true}};
    postModel.updateOne(condition, query, function(err, res){
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

//view post
module.exports.view = async function(req, res){
    let id = req.params.id;
    let data = await postModel.find({_id: id});
    let active = data[0].category;
    let relative = await postModel.find({category: active, _id: {$ne: id}}).sort({created: 1}).limit(5);
    relative = getFirstImageandAndDelete(relative);
    
    res.render('post/view',{
        post: data[0],
        relative: relative
    });
    let query = {$inc: {view: 1}};
    postModel.updateOne({_id: id}, query, function(err, res){
        if (err) throw err;
        console.log('Update successfully');
    });
    //console.log(); 
}