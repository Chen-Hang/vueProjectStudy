### 项目服务端设计 Express后台代码编写

#### 1.安装配置MongoDB,Studio 3T,Postmman工具

#### 2.使用express框架
1. 全局安装生成器 exporess-generator -g
2. express movie_service  ， npm install
3. 启动 set DEBUG=movie_service & npm start


#### 3.安装中间件 Mongoskin或Mongoose,连接数据库
1.npm install mongoose --save
2.新建测试路由 mongooseTest
```js
var express = require('express');
var router = express.Router(); //express路由
var mongoose=require('mongoose'); //数据库引入

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 
定义路由：
新增一个测试路由  mongooseTest 用于测试MongoDB是否成功启动并能正确使用
为了测试创建一个Cat的数据集，其中包含一个name数据属性，值为String,连接一个pet的库
cat中新增一个数据 name属性为Tom类型
*/
router.get('/mongooseTest',function(req,res,next){
  /* 
    参数一 是数据库的URL地址，即启动MongoDB的IP地址和访问的数据库
    参数二 是一个js的对象，用于传递相关配置
  */
  mongoose.connect('mongodb://localhost/pets',{
    useMongoClient:true
  })
  mongoose.Promise=global.Promise;
  var Cat=mongoose.model('Cat',{nme:String});  //实例化Cat数据集 调用Mongoose中的model()方法，传入名称和结构来创建一个数据集
  var tom=new Cat({name:'Tom'})  //数据集Cat中创建的对象tom 
  tom.save(function(err){ //通过Mongoose创建的模型model自带的save方法来保存内容
    if(err){
      console.log(err);
    }else{
      console.log(`success insert`);
    }
  })
  res.send("数据库连接成功")
})
module.exports = router;
```


#### 4.使用Supervisor监控代码的修改
>解决每次修改后需要终止服务重新启动的问题
```js
cnpm install supervisor -g

supervisor bin/www
```


###  用户系统开发
#### 1.common文件夹存放连接数据库的公共模块
```js
/*
  引入mongoose中间件，连接数据库地址，之后以包的形式抛出给后面的组件使用
*/
const mongoose=require('mongoose');
const url='mongodb://localhost/movieServer';
mongoose.connect(url) //连接数据库

module.exports=mongoose;
```

#### 2.models文件夹用于存放各种models
```js
var mongoose = require('../common/db');
//1.定义user相关的数据集，包含七个字段。赋予响应的数据类型
var user = new mongoose.Schema({
    username: String,
    password: String,
    userMail: String,
    userPhone: String,
    userAdmin: Boolean,
    userPower: Number,
    userStop: Boolean
})
//2.定义一些常用的搜索方法，用于搜索和显示相关数据的内容
user.statics.findAll = function(callBack){
    this.find({},callBack);
};
user.statics.findByUsername = function(name,callBack){
    this.find({username:name},callBack);
};
//登录匹配是不是拥有相同的用户名和密码并且没有处于封停状态
user.statics.findUserLogin = function(name,password,callBack){
    this.find({username:name,password:password,userStop:false},callBack);
};
//验证邮箱和电话以及用户名找到用户
user.statics.findUserPassword = function(name,mail,phone,callBack){
    this.find({username:name,userMail:mail,userPhone:phone},callBack);
};

var userModel= mongoose.model('user',user);
module.exports = userModel;
```
#### 3.userRouter（routes/users.js）中新增路由地址，以users为域名的地址，API接口定义,注册和登录的实现
```js
var express = require('express');
var router = express.Router();
var user = require('../models/user')
var crypto = require('crypto');//crypto模块的目的是为了提供通用的加密和哈希算法
// var movie=require("../models/movie")
// var mail=require("../models/mail")
// var comment=require("../models/comment")
const INIT_TOKEN = 'TKL02o';

/* GET users listing. */
//用户登录接口
router.post('/login', function (req, res, next) {
  if(!req.body.username){
    res.json({
      status:1,
      message:"用户名为空"
    })
  }
  if(!req.body.password){
    res.json({
      status:1,
      message:'密码为空'
    })
  }
  user.findUserLogin(req.body.username,req.body.password,function(err,userSave){
    if(userSave.length!=0){
      //通过md5查看密码
      var token_after=getMD5Password(userSave[0]._id);
      res.json({
        status:0,
        message:'用户登录成功',
        data:{
          token:token_after,
          user:userSave
        }
      })
    }else{
      res.json({
        status:1,
        message:"用户名或密码错误"
      })
    }
  })
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

// 用户提交评论
router.post("/postComment",function(req,res,next){

})
//用户点赞
router.post("/support",function(req,res,next){
  
})
//用户找回密码
router.post("/findPassword",function(req,res,next){
  
})
//用户发送站内信
router.post("/sendEmail",function(req,res,next){
  
})
//用户显示站内信，receive参数值为1时表示发送的内容，2时表示收到的内容
router.post("/showEmail",function(req,res,next){
  
})

//获取md5的值

function getMD5Password(id) {
  var md5=crypto.createHash('md5');
  var token_before=id+INIT_TOKEN;
  return md5.update(token_before).digest("hex")
}
module.exports = router;


```

