const express = require('express')
const router = express.Router();
const postController = require('../controller/post.controller');
const getImage = require('../middleware/getImage');


router.get('/write-news', postController.write);

router.get('/manage-posts', postController.listPost);

router.post('/write-news', getImage.getImg, postController.post);

module.exports = router;