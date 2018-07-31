"use strict";
var main = document.getElementById("main");
//生成弹幕
function make(content) {
    var span = document.createElement("span");
    span.innerText = content;
    span.style.left = main.offsetWidth + "px";
    //显示区高度先减去字体大小，再乘随机数，避免弹幕出现在屏幕外，6是预留出来的高度，比如字体16px，实际占用21px高度
    span.style.top = Math.random() * (main.offsetHeight - parseInt(getComputedStyle(document.body).fontSize) - 6) + "px";
    main.appendChild(span);
}
//移动每一个弹幕
function move(){
    var spanArr = main.getElementsByTagName("span");
    for(var i=0, len=spanArr.length; i<len; i++){
        var span = spanArr[i];
        span.style.left = span.offsetLeft - 5 +"px";
        //如果弹幕出了屏幕，将它移除，并且数组长度减1
        if(span.offsetLeft + span.offsetWidth < 0){
            span.remove();
            i--;
            len--;
        }
    }
}
//利用定时器，使弹幕连续移动
var timer = setInterval(move, 40);
//回车发送弹幕
document.getElementById("content").onkeypress = function(e) {
    if (e.keyCode === 13) {
        make(this.value);
        this.value = "";
    }
}
//暂停 调试用
document.getElementById("pause").addEventListener("click", function() {
	clearInterval(timer);
});