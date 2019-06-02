const mongoose=require('mongoose');
const url='mongodb://localhost/movieServer';
mongoose.connect(url) //连接数据库

module.exports=mongoose;