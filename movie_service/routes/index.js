var express = require('express');
var router = express.Router();

//数据库引入
var mongoose=require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 
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



