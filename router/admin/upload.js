// 图片轮播图片上传路由
 /*用post上传的图片没有后缀，不能打开，所以需要改名，用path获取图片原来的名字，并给它加上后缀--获取ejs文件里图片上传代码段中的<input type="file" id="upload1" style="display:none;"/>上传的图片路径，然后传到后台去，通过ajax上传。通过files方法 获得图片的信息,上传必须通过FormData()（详见upload.ejs文件）方法，用data.append()方法把要添加的数据丢进去*/
const express = require("express");
const fs = require("fs");//读写文件的中间件
const pathLib = require("path");//获取后缀的中间件

module.exports = function(){
    var router = express.Router();
    router.use("/",(req,res) => {
        //下面的代码是用来修改图片名字
        // req.files[0].path曾用名
        // pathLib.parse(req.files[0].originalname).ext解析曾用名并给它加上新的后缀（ext的值就是后缀）
        var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
        //fs.rename方法改文件名
        fs.rename(req.files[0].path,newName,(err)=>{
            if(err){
                res.send({"ok":false,"msg":"上传失败"}).end();
            }else{
                res.send({"ok":true,"msg":"上传成功","fileUrl":newName}).end();
            }
        })
    })
    return router;
}




