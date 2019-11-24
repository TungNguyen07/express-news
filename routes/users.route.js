const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const validateInfomation = require('../middleware/validateUserInfo');
const validateLogin = require('../middleware/validateLogin');
const validatePermiss = require('../middleware/validatePermission');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send();
});

router.get('/signup', userController.create);

router.post('/signup',validateInfomation.create, userController.postCreateUser);

router.get('/login', userController.login);

router.post('/login',validateLogin.Login, userController.loginUser);

router.get('/logout', userController.logout);

router.get('/info/:id', userController.info);

router.post('/info/:id',validateInfomation.editInfo, userController.changeInfo)

router.get('/info/change-password/:id', userController.changePassword);

router.post('/info/change-password/:id', validateInfomation.changePassword, userController.postChangePassword);

router.get('/list-users', validatePermiss.checkPermission, userController.listUsers);

router.get('/search', validatePermiss.checkPermission, userController.searchUsers);

router.post('/change-permission/:id', validatePermiss.checkPermission, userController.upgradePermission);

router.get('/delete/:id', validatePermiss.checkPermission, userController.deleteUser);

module.exports = router;
