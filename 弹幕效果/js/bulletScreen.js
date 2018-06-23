"use strict";
var main = document.getElementById("main");
//生成弹幕
function make(content) {
    var span = document.createElement("span");
    span.innerText = content;
    span.style.left = main.offsetWidth + span.offsetWidth + "px";
    span.style.top = Math.random() * main.offsetHeight - parseInt(getComputedStyle(document.body).fontSize) + "px";
    main.appendChild(span);
}
//移动每一个弹幕
function move(){
    var spanArr = main.getElementsByTagName("span");
    for(var i=0, len=spanArr.length; i<len; i++){
        var span = spanArr[i];
        span.style.left = span.offsetLeft - 5 +"px";
        if(span.offsetLeft + span.offsetWidth < 0){
            span.remove();
            i--;
            len--;
        }
    }
}
//利用定时器，使弹幕连续移动
setInterval(move, 40);
document.getElementById("content").onkeypress = function(e) {
    if (e.keyCode === 13) {
        make(this.value);
        this.value = "";
    }
}