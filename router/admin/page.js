// 网站信息界面路由
const express = require("express");
//连接数据库，和数据库里的数据进行比较
const mysql = require("mysql");
//创建一个连接
var db = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"root",
    database:"zhenghang"
  }
)

module.exports = function(){
  var router = express.Router();
  // 通过get渲染页面
  router.get("/",(req,res) => {
    res.render("admin/page.ejs",{});
  })
  // 通过psot提交数据
  router.post("/",(req,res) => {
    // 修改后台数据,这里WHERE id=1改为WHERE title ="${req.body.title}"，就可以通过标题（在后台中的标题栏里输入和数据库page表格对应的标题）来更改内容，而不是通过id
    db.query(`UPDATE page SET title = "${req.body.title}",content = "${req.body.content}" WHERE title ="${req.body.title}"`,(err,data)=>{
      if(err){
        res.send("连接数据库发生错误").end();
      }else{
        res.redirect("/admin/page");
      }
    })
  })
  return router;
}