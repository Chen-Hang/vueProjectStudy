var mongoose = require('../common/db');

/*
    在 Mongoose 中，
    所有数据都由一个 Schema 开始创建。每一个 schema 都映射到一个 Mongodb 的集合(collection)，
    并定义了该集合(collection)中的文档(document)的形式。
    Schema 的键允许的Schema类型有：
            String
            Number
            Date
            Buffer
            Boolean
            Mixed
            ObjectId
            Array
*/

var user = new mongoose.Schema({
    username: String,
    password: String,
    userMail: String,
    userPhone: String,
    userAdmin: Boolean,
    userPower: Number,
    userStop: Boolean
})


/*
 静态方法
调用者：通过Schema 创建的Model
我们可以为Model 创建静态方法供Model 调用。
*/
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