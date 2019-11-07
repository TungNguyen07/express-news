const express = require('express');
const router = express.Router();
const validateLogin = require('../middleware/validateLogin');

/* GET home page. */
router.get('/',validateLogin.checkCookie, function(req, res, next) {
  console.log(res.locals.user);
  res.render('layout', { 
    title: 'Express News'
  });
});


module.exports = router;
