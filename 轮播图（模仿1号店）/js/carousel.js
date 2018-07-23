"use strict";
function Carousel() {
	var _this = this,
		next = 0,
		timer = null;
	
	var carousel = document.getElementById("carousel"),	//外边框区
		main = carousel.getElementsByClassName("carousel-main")[0],	//图片区
		nav = carousel.getElementsByClassName("carousel-nav")[0],	//导航区
		mainList = main.getElementsByTagName("li"),
		navList = nav.getElementsByTagName("li"),
		left = carousel.getElementsByClassName("carousel-left")[0],	//向左按钮
		right = carousel.getElementsByClassName("carousel-right")[0];//向右按钮
	
	//伪数组转数组，使用时效率更高
	mainList = Array.prototype.slice.call(mainList);
	navList = Array.prototype.slice.call(navList);
	
	//轮播执行核心代码
	this.run = function(index) {
		index = index || 0;	//设置默认值
		
		for (var i=0, len=mainList.length; i<len; i++) {
			var mainLi = mainList[i],
				navLi = navList[i],
				className = mainLi.className;	//获取图片class
			if (className == "active") {	//图片与导航同步，只判断一个即可
//				mainLi.className = "unactive";	//图片
				mainLi.className = "";	//图片
				navLi.className = "";	//导航
			}
		}
		
		mainList[index].className = "active";	//图片
		navList[index].className = "active";	//导航
		
		//每次执行完，把next重新赋值
		next = (index + 1) % 7;
	};
	
	//自动播放
	this.auto = function() {
		timer = setInterval(function() {
			_this.run(next);
		}, 1500);
	};
	
	//跳转到指定位置
	this.toTarget = function(index) {
		clearInterval(timer);	//人为控制时，先暂停定时任务
		_this.auto();	//这两行要放在if前
		if ((index + 1) % 7 == next) {	//如果目标就是当前显示的，则不执行（用户连续点击同一个时）
			return;
		}
		_this.run(index);
	};
	
	//向左动
	this.toLeft = function() {
		_this.run((next + 7 - 2) % 7);	//避免next先减2变成负数
	};
	
	//向右动
	this.toRight = function() {
		_this.run(next);
	};
	
	/*绑定事件*/
	//向左
	left.addEventListener("click", function() {
		_this.toLeft();
	});
	//向右
	right.addEventListener("click", function() {
		_this.toRight();
	});
	
	//鼠标悬浮导航栏
	for (var i=0, len=navList.length; i<len; i++) {
		//用立即执行函数把i套现，否则取值会错误
		(function(j){
			navList[j].addEventListener("mouseenter", function() {
				_this.run(j);
			});
		}(i));
	}
	
	//鼠标悬浮整体
	carousel.addEventListener("mouseenter", function() {
		clearInterval(timer);
	});
	//鼠标离开整体
	carousel.addEventListener("mouseleave", function() {
		_this.auto();
	});
	
	/*初始化时，开始执行*/
	
	//由于定时任务第一次触发有延时，所以先主动run一下
	_this.run(next);
	_this.auto();
}