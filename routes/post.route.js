const express = require('express')
const router = express.Router();
const postController = require('../controller/post.controller');

router.get('/write-news', postController.write);

router.get('/manage-posts', postController.listPost);

router.post('/write-news', postController.post);

module.exports = router;