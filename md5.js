// MD5加密
const crypto = require("crypto"); //crypto密码
//设置加密方式为md5
var hash = crypto.createHash("md5");

hash.update("admin");

var str = hash.digest("hex");

console.log(str);
