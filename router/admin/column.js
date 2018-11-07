// 留言管理界面路由
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
    db.query("SELECT * FROM column WHERE id=1",(err,data)=>{
      if(err){
        res.send("连接数据库发生错误").end();
      }else{
        res.render("admin/column.ejs",{data:data});
      }
    })
  })
  // 通过psot提交数据
  router.post("/",(req,res) => {
    // 修改后台数据,这里的名字和数据库表格和ejs里的名字对应相同
    db.query(`UPDATE column SET name = "${req.body.name}",sort= "${req.body.sort}" WHERE id = 1`,(err,data)=>{
      if(err){
        res.send("连接数据库发生错误").end();
      }else{
        res.redirect("/admin/column");
      }
    })
  })
  return router;
}