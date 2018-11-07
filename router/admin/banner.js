// 图片轮播界面路由
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
    if(req.query.act == "del"){
      db.query(`DELETE FROM banner WHERE id="${req.query.id}"`,(err,data)=>{
        if(err){
          res.send({"ok":false,"msg":"数据库连接错误"}).end();
        }else{
          res.send({"ok":true,"msg":"删除成功"}).end();
        }
      });
    }else{
      //因为上传的图片是通过循环上传的，所以这里的id>0
      db.query("SELECT * FROM banner WHERE id > 0",(err,data)=>{
        if(err){
          res.send("连接数据库发生错误").end();
        }else{
          res.render("admin/banner.ejs",{data:data});
        }
      })
    }
  })
  // 通过post提交数据
  router.post("/",(req,res,next) => {
    db.query(`INSERT INTO banner VALUES ("","${req.body.img_src}","${req.body.sort}","${req.body.title}","${req.body.description}")`,(err,data)=>{
      if(err){
        res.send("连接数据库发生错误").end();
      }else{
        res.redirect("/admin/banner");
      }
      next();
    })
  })
  return router;
}




