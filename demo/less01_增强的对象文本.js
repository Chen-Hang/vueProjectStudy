var serviceBase={
    port:3000,
    url:'192.167.0.1'
}
var getAccounts=function(){
    return [1,2,3]
}
var accountServiceES5={
    port:serviceBase.port,
    url:serviceBase.url,
    getAccounts:getAccounts,
    toString:function(){
        return JSON.stringify(this.valueOf())
    },
    getUrl:function(){
        return 'http://'+this.url+':'+this.port
    }
}
//使用Object.create()基础原型的方法

var obj=Object.create(serviceBase);
var obj2={
    getAccounts:getAccounts,
    toString:function(){
        return JSON.stringify(this.valueOf())
    },
}