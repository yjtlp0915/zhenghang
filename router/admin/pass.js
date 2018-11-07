// 修改密码界面路由

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
    res.render("admin/pass.ejs",{});
  })
  // 通过psot提交数据
  router.post("/",(req,res) => {
    //先查找数据库admin_user表格里的密码进行比较判断
    db.query(`select * from admin_user WHERE id=1`,(err,data)=>{
      if(err){
        res.send("连接数据库发生错误").end();
      }else{
        var oldpassword = data[0].password;
        //这里的mpass、newpass、renewpass对应的是pass.ejs里面的名字
        if(oldpassword != req.body.mpass){
          res.send("原密码输入错误");
        }else{
          if(req.body.newpass != req.body.renewpass){
            res.send("连接数据库发生错误").end();
          }else{
            //执行修改密码
            db.query(`UPDATE admin_user SET password= "${req.body.newpass}" WHERE id=1`,(err,data)=>{
              if(err){
                res.send("连接数据库发生错误").end();
              }else{
                res.redirect("/admin/pass"); //这块不需要加.ejs
              }
            })
          }
        }
      }
    })
  })
return router;
}