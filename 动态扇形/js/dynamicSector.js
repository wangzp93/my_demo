var can = document.getElementById("can");
var box = document.getElementById("box");
var ctx = can.getContext("2d");

//原型上添加画图形的方法
CanvasRenderingContext2D.prototype.sector = function(x, y, r, sDeg, eDeg) {
    // 圆心，半径，角度
    this.save();
    this.beginPath();
    this.moveTo(x, y);
    this.arc(x, y, r, Math.PI * sDeg / 180, Math.PI * eDeg / 180, false);
    this.closePath();
    this.restore();
    return this;
}
ctx.fillStyle = "red";
var timer = null;
//初始角度0
var angle = 0;
timer = setInterval(function(){
    if(angle < 360){
        angle += 5;
        ctx.sector(250, 250, 100, 0, angle).fill();
        box.innerText = (angle / 360 * 100).toFixed(2) + "%";
    }else{
        //大于360度，停止
        clearInterval(timer);
    }
}, 200);