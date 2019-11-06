const express = require('express');
const router = express.Router();
const validateLogin = require('../middleware/validateLogin');

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('layout', { 
    title: 'Express',
   
  });
});


module.exports = router;
