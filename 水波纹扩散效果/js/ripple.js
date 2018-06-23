var cav = document.getElementById("cav");
var ctx = cav.getContext("2d");
var arcArr = [];	//存放多个圆
var timer = null;

cav.onclick = function(e){
    var x = e.offsetX,
        y = e.offsetY,
        r = 0,
        maxr = getMaxR(x, y, cav.width, cav.height);
        console.log(x, y)
    var primaryLen = arcArr.length;
    arcArr.push({
        x: x,
        y: y,
        r: r,
        maxr: maxr
    });
    // 如果最初的数组为空，那么这时启动定时器
    if(primaryLen === 0){
        timer = setInterval(function(){
            ctx.clearRect(0, 0, cav.width, cav.height);	//每次画前，清空画布
            for(var i=0, len = arcArr.length; i<len; i++){
                var arc = arcArr[i];
                drawArc(arc.x, arc.y, arc.r += 5);
                if(arc.r > arc.maxr){
                    //如果圆的范围超出画布，把它从数组清除
                    arcArr.splice(i, 1);
                    i--;
                    len--;
                }
            }
            if(arcArr.length === 0){
                //如果此时数组为空，关闭计时器
                clearInterval(timer);
            }
        }, 20);
    }
}
// 获取当前可画最大半径
function getMaxR(x, y, width, height) {
    var r1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        r2 = Math.sqrt(Math.pow(width - x, 2) + Math.pow(y, 2)),
        r3 = Math.sqrt(Math.pow(x, 2) + Math.pow(height - y, 2)),
        r4 = Math.sqrt(Math.pow(width - x, 2) + Math.pow(height - y, 2));
    r1 = r1 > r2 ? r1 : r2;
    r3 = r3 > r4 ? r3 : r4;
    return r1 > r3 ? r1 : r3;
}
// 画圆
function drawArc(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
}