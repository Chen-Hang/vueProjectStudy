### ES6的一些常用语法
##### Default Parameters 默认参数
```js
var link=function(height,color,url){
    var height=height||20;
    var color=color||'red';
    var url=url||'http://www.baidu.com'
}

//ES6中可以直接将默认值放在函声明里
var link=function(height=50,color='red',url='http://www.baidu.com'){
    //......
}
```

##### Template Literals 模板文本
```js
var name=`your name is ${first} ${last}`
var url=`http://www.localhost:8080/index/${id}`
```

##### Multi-lin String 多行字符串
```js
var htmlString=`
    <div>this is one div</div>
    <p>this is one p</p>
`
```

##### Destructuring Assignment 解构赋值
- ES5中
```js
var data=$('body').data();
house=data.house;
mouse=data.mouse;
```
- Node.js中使用ES5
```js
var jsonMiddleware=require('body-parser');
var body=req.body;
username=body.username;
password=body.password;
```
- ES6中我们可以使用下面语句代替上面的ES5代码
```js
var {housr,mouse}=$('body').data();
var {jsonMiddleware}=require('body-parser');
var {username,password}=req.body;

//同样适用于数组
var [col1,col2]=$('.column')
[line1,line2,line3]=file.split('n')
```

##### Enhanced Object Literals 增强对象文本
```js

```


##### Arrow Functions 箭头函数
> 有了箭头函数就不必使用that=this或者self=this,_this=this,.bind(this)这么麻烦了
```js
var _this=this;
$('.btn').click(function(event){
    _this.sendData()
})

//ES6
$('.btn').click((event)=>{
    _this.sendData()
})
```
- 隐式返回值
```js
//隐式的返回值
var msg=list.map(function(value,item,arr){
    return 'ID of'+index+'element is'+value+'';
})
//ES6写法
var msg=list.map((value,item,arr)=>`ID of ${index} element is ${value`)
```


##### Promise 实现

```js
setTimeout(function(){
    console.log(123);
},1000)


//Promise实现
var wait1000=new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
})
wait1000.then(()=>{
    console.log(12345);
})
```



##### 块作用域构造let

##### Classes 类
>ES6中的类没有使用函数，而是使用原型实现类
```js

// 方法名不需要加function关键字，而且冒号也不需要了
//另外一个区别就是不需要分配属性this
class baseModel{
    constructor(options,data){ // options={}，data=[]这样传参
        this.name='Base';
        this.url='http://www.baidu.com';
        this.data=data;
        this.options=options;
    }
    getName(){  //类的方法
        console.log(``Class name:${this.name})
    }
}

```


##### Modules 模块
>ES6以前js并不支持本地的模块，于是人们想出来AMD,RequireJS,CommonJS以及其他解决办法
```js
//export 和 import进行一个模块的引入和抛出
export var port=3000;
export function getAccounts(url){
    //....
}
```
在模块中导入
```js
import {port,getAccounts} from 'module';
console.log(port)//3000
//或者自定义命名
import * as service from 'module'
console.log(service.port)//3000
```

#### 使用Babel进行ES6的转化

#### 生成环境的webpack
- webpack4的效率构建时间降低了60%-98%，大大提高了webpack的构建效率

- 最大的改变是在于配置设计上实现了Mode设置,Mode有两个值development或production(默认)，另外，entry和output也有了默认值

- 体验
1. cnpm init --yes
2. cnpm install webpack --save
3. cnpm install webpack-cli --save webpack3中webpack的cli和它本身在同一个包中，但是版本4已经将他们分开了，以便达到更好管理的目的

4. package.json中 'build':'webpack'
5. webpack4会将src/index.js当成默认值，而不再是webpack.config.js
6. webpack4提供的两种模式，一种用于加速开发，减少构建时间而不考虑生成大小的开发模式，一种是完全用于生成环境的生成模式
```js
"dev":"webpack --mode development",
"production":"webpack --mode production"
// npm run dev  打包出还有注释和格式等未压缩状态的代码
// npm run production 打包出最小的压缩生产环境代码
```
这样webpack4完全可以不需要任何一个配置文件就能完成一个项目的构建工作