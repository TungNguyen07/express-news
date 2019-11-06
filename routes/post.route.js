const express = require('express')
const router = express.Router();

router.get('/write-news', function(req, res){
    res.render('post/newPost', {title: 'Creat post'})
});

module.exports = router;