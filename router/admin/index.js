const express = require('express');

module.exports = function(){
  var router = express.Router();

  //先检查登录状态
  router.use((req,res,next) => {
    //判断用户是否登录过，session,如果没有登录，就重定向到login页面
    if(!req.session['admin_id'] && req.url != '/login'){
      res.redirect('/admin/login');
    }else{
      next();
    }
  })

  //请求后台首页
  router.get("/",(req,res) => {
    res.render("admin/index.ejs",{})
  })

  //请求登录
  router.use("/login",require('./login')());
  //请求网站信息设置
  router.use("/system",require('./system')());
  //请求图片轮播
  router.use("/banner",require('./banner')());
  //图片轮播里的图片上传接口
  router.use("/upload",require('./upload')());
  // router.use("/add",require('./add')());
  //留言管理
  router.use("/book",require('./book')());
  // router.use("/cate",require('./cate')());
  // router.use("/cateedit",require('./cateedit')());
  // 栏目管理
  router.use("/column",require('./column')());
  // router.use("/list",require('./list')());
  // 单页管理
  router.use("/page",require('./page')());
  //修改密码
  router.use("/pass",require('./pass')());
  // router.use("/tips",require('./tips')());
  return router;
}
