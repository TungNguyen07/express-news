const express = require('express')
const router = express.Router();
const postController = require('../controller/post.controller');
const getImage = require('../middleware/getImage');


router.get('/write-news', postController.write);

router.get('/manage-post', postController.listPost);

router.post('/write-news', postController.post);

router.get('/approve/:id', postController.approvePost);

router.get('/deny/:id', postController.denyPost);

router.get('/view/:id');

module.exports = router;