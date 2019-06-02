var express = require('express');
var router = express.Router();

var user = require('../models/user')
var crypto = require('crypto');//crypto模块的目的是为了提供通用的加密和哈希算法
const INIT_TOKEN = 'TKL02o';

/* GET users listing. */
//用户登录接口
router.post('/login', function (req, res, next) {
  res.send('respond with a resource');
});
//用户注册接口
router.post('/register', function (req, res, next) {
  console.log(req.body.username);
  
  if (!req.body.username) {
    res.json({ status: 1, message: "用户名为空" })
  }
  if (!req.body.password) {
    res.json({ status: 1, message: "密码为空" })
  }
  if (!req.body.userMail) {
    res.json({ status: 1, message: "用户邮箱为空" })
  }
  if (!req.body.userPhone) {
    res.json({ status: 1, message: "用户手机为空" })
  }
  user.findByUsername(req.body.username, function (err, userSave) {
    if (userSave.length != 0) {
      // res.json(userSave)
      res.json({ status: 1, message: "用户已注册" })
    } else {
      var registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0
      })
      registerUser.save(function () {
        res.json({ status: 0, message: "注册成功" })
      })
    }
  })
})
module.exports = router;
