const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const validateCreate = require('../middleware/validateCreate');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({});
});
router.get('/login', userController.login)

router.get('/signup', userController.create);

router.post('/signup', validateCreate.validateCreate, userController.postCreateUser);

router.post('/login', userController.loginUser);

router.get('/logout', userController.logout);

module.exports = router;
