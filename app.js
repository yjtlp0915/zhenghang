//写后台的步骤
const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParse = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const mysql = require('mysql');
//上传文件或者图片的存储位置
const upload = multer({dest:"./www/upload"});

const app = express();
app.listen(8081);

//解析请求数据post
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload.any());//any表示接收所有上传等等东西

//解析cookie、session
app.use(cookieParse());
(function(){
  //设置密钥
  var keys = [];
  for(var i=0;i<10000;i++){
    keys.push("zhenghang_" + Math.random());
  }
  app.use(cookieSession({
    name:"admin_id",
    keys:keys,
    maxAge:30*60*1000
  }))
})();

//设置模版
app.engine("html",consolidate.ejs); //设置什么模板
app.set("views","./template"); //模板存放的位置
app.set("view engine","html"); //输出文件类型

//设置路由
// app.use("/",);
app.use("/admin",require("./router/admin/index.js")());

//静态页面
app.use(static("./www/"))
