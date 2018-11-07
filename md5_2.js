// 引入common模块
const common = require("./libs/common.js");
var str = "admin";
var str1 = common.md5(str + common.md5_sign)

console.log(str1)
