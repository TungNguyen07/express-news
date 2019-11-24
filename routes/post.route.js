const express = require('express')
const router = express.Router();
const postController = require('../controller/post.controller');
const validatePermiss = require('../middleware/validatePermission');
const validateAuthor = require('../middleware/validateAuthor');
const validateContent = require('../middleware/validateEditor');

router.get('/write-news', validateAuthor.checkAuthor, postController.write);

router.get('/manage-post', validatePermiss.checkPermission, postController.listPost);

router.post('/write-news', validateAuthor.checkAuthor, validateContent.checkEditor, postController.post);

router.get('/approve/:id', validatePermiss.checkPermission, postController.approvePost);

router.get('/deny/:id', validatePermiss.checkPermission, postController.denyPost);

router.get('/view/:title/:id', postController.view);

module.exports = router;