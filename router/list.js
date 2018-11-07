// 内容管理界面路由
const express = require("express");
//连接数据库，和数据库里的数据进行比较
const mysql = require("mysql");
const common = require("../../libs/common");
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
  // 通过地址栏来请求页面
  router.get("/",(req,res) => {
    res.render("admin/list.ejs",{})
  })
  // 通过表单来请求psot数据
  // router.post("/",(req,res) => {

  // })
  return router;
}