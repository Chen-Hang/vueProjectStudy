const express=require('express');
const app=express(); //定义express实例

//定义路由
app.get('/',function(req,res){
    res.send('hello world')
})

//设置启动的地址端口信息

let server=app.listen(3000,function(){
    let host=server.address().address;
    let port=server.address().port;
    console.log(`Express listening at http:${host}:${port}`);
    
})