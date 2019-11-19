const express = require('express');
const router = express.Router();
const validateLogin = require('../middleware/validateLogin');
const index = require('../controller/post.controller')

/* GET home page. */
router.get('/:active',validateLogin.checkCookie, index.indexCategory);

router.get('/',validateLogin.checkCookie, index.index);

module.exports = router;
