### 项目服务端设计

#### 安装配置MongoDB,Studio 3T,Postmman工具

#### 使用express框架
1. 全局安装生成器 exporess-generator -g
2. express movie_service
3. 启动 set DEBUG=movie_service & npm start

#### 安装中间件 Mongoskin或Mongoose
1.在router中导入 `var mongoose=require('mongoose')`
2.添加一个测试路由，插入数据库
```js
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
```

#### 使用Supervisor监控代码的修改
>解决每次修改后需要终止服务重新启动的问题
```js
cnpm install supervisor -g

supervisor bin/www
```