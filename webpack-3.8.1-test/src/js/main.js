var obj = require("./obj.js");

document.write(obj.name);
//require("!style-loader!css-loader!../css/div.css");
require("../css/div.css");
var $ = require("jquery");
$("#div2").html("这是一个jQuery应用");
document.write(obj.build);
