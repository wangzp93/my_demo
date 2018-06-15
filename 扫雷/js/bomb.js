var BOMBARR = [];
var BOMBOBJ = {};
var BOMBCOUNT = 15;
function init(){
	document.getElementById("success").addEventListener("click", reStart, false);
	document.getElementById("gameover").addEventListener("click", reStart, false);
	reStart();
}
function reStart(){
	BOMBARR = [];
	BOMBOBJ = {};
	document.getElementById("success").style.display = "none";
	document.getElementById("gameover").style.display = "none";
	initPanel();
	createBomb();
	setRoundBombCount();
}
//初始化面板
function initPanel(){
	var ul = document.getElementById("main");
	ul.innerHTML = "";
	ul.addEventListener("click", clickOne, false);
	ul.addEventListener("contextmenu", markBomb, false);
	for(var i=0; i<100; i++){
		var li = document.createElement('li'),
			y = parseInt(i / 10),
			x = i % 10;
		li.className = "init";
		li.setAttribute("data-x", x+1);
		li.setAttribute("data-y", y+1);
		li.setAttribute("index", i);
		ul.appendChild(li);
	}
}
//随机生成地雷
function createBomb(){
	var liArr = document.getElementById("main").getElementsByTagName("li");
	for(var i=0; i<BOMBCOUNT; i++){
		var x = parseInt(Math.random() * 10 + 1),
			y = parseInt(Math.random() * 10 + 1),
			index = getLiIndex(x, y);
		if(!BOMBOBJ[index]){
			BOMBOBJ[index] = true;
			BOMBARR.push(index);
			var li = liArr[index];
//						li.className = "bomb";
			li.setAttribute("isBomb", true);
		}else{
			i--;
		}
	}
}
//设置周边地雷个数
function setRoundBombCount(){
	var liArr = document.getElementById("main").getElementsByTagName("li");
	for(var i=0, len=liArr.length; i<len; i++){
		if(BOMBOBJ[i]){
			continue;
		}
		var li = liArr[i],
			x = li.getAttribute("data-x"),
			y = li.getAttribute("data-y");
		var count = findRoundBombCount(x, y);
//					li.innerHTML = count;
		li.setAttribute("bombCount", count);
	}
}
//寻找周边地雷个数
function findRoundBombCount(intitalX, intitalY){
	intitalX = parseInt(intitalX);
	intitalY = parseInt(intitalY);
	var count = 0;
	getRoundIndexArr(intitalX, intitalY, function(roundIndex){
		if(BOMBOBJ[roundIndex]){
			count++;
		}
	});
	return count;
}
//点击一个区域
function clickOne(e){
	var li = e.target;
	showOne(li);
}
//展示点击的区域
function showOne(li){
	var index = li.getAttribute("index"),
		bombCount = li.getAttribute("bombCount"),
		isShow = li.getAttribute("isShow");
	if(isShow == "true"){	//如果已经显示，return
		return;
	}
	if(BOMBOBJ[index]){
		showBomb();
		document.getElementById("gameover").style.display = "block";
		return;
	}
	li.className = "";
	li.setAttribute("isShow", true);
	if(bombCount == 0){
		var intitalX = parseInt(li.getAttribute("data-x")),
			intitalY = parseInt(li.getAttribute("data-y")),
			liArr = document.getElementById("main").getElementsByTagName("li");
		getRoundIndexArr(intitalX, intitalY, function(roundIndex){
			showOne(liArr[roundIndex]);
		});
	}else{
		li.innerHTML = bombCount;
	}
}
//展示地雷
function showBomb(){
	var liArr = document.getElementById("main").getElementsByTagName("li");
	for(var i=0; i<BOMBCOUNT; i++){
		var li = liArr[BOMBARR[i]];
		li.className = "bomb";
	}
}
//标记地雷
function markBomb(e){
	e.preventDefault();
	var li = e.target,
		className = li.className;
	if(className == "init"){
		li.className = "mark";
		computedIsSuccess();
	}else if(className == "mark"){
		li.className = "init";
	}
}
//计算是否胜利
function computedIsSuccess(){
	var markArr = document.getElementById("main").getElementsByClassName("mark"),
		len = markArr.length;
	if(len === BOMBCOUNT){
		for(var i=0; i<len; i++){
			var index = markArr[i].getAttribute("index");
			if(!BOMBOBJ[index]){
				return;
			}
		}
		document.getElementById("success").style.display = "block";
	}
}
//根据x y获取index
function getLiIndex(x, y){
	return (y - 1) * 10 + x - 1;
}
//获取周边index
function getRoundIndexArr(intitalX, intitalY, callback){
	intitalX = parseInt(intitalX);
	intitalY = parseInt(intitalY);
	var indexArr = [];
	for(var x = intitalX - 1; x <= intitalX + 1; x++){
		if(x > 0 && x <=10){
			for(var y = intitalY - 1; y <= intitalY + 1; y++){
				if(y > 0 && y <= 10){
					if(x === intitalX && y === intitalY){
					}else{
						var roundIndex = getLiIndex(x, y);
						indexArr.push(roundIndex);
						callback(roundIndex);
					}
				}
			}
		}
	}
	return indexArr;
}