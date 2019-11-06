const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const validateInfomation = require('../middleware/validateUserInfo');
const validateLogin = require('../middleware/validateLogin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send();
});
router.get('/login', userController.login)

router.get('/signup', userController.create);

router.post('/signup',validateInfomation.create, userController.postCreateUser);

router.post('/login',validateLogin.Login, userController.loginUser);

router.get('/logout', userController.logout);

router.get('/info/:id', userController.info)

router.post('/info/:id',validateInfomation.editInfo, userController.changeInfo)

router.get('/info/change-password/:id', userController.changePassword);

router.post('/info/change-password/:id', validateInfomation.changePassword, userController.postChangePassword);

router.get('/list-users', /*validateInfomation.getPermission,*/ userController.listUsers);

router.get('/search', userController.searchUsers);

router.get('/user-info/:id', userController.seeUserInfo);

module.exports = router;
