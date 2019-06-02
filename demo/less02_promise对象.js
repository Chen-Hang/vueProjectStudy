// setTimeout(function(){
//     console.log(123);
// },1000)


var wait1000=new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
})
wait1000.then(()=>{
    console.log(12345);
})