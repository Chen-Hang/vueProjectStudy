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