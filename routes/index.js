const express = require('express');
const router = express.Router();
const loginValidate = require('../middleware/validateUserLogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: 'Express' });
});


module.exports = router;
