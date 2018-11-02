/*
	mvc 页面中的 JS
*/




//获取当前时间的对象
var Nowtime = function(){
	var date = new Date();
	this.nowMilli = date.getMilliseconds();
	this.nowSecond = date.getSeconds();
	this.nowMinute = date.getMinutes();
	this.nowHour = date.getHours();
	this.nowYear = date.getFullYear();
	this.nowMonth = date.getMonth()+1;
	this.nowDate = date.getDate();
	this.nowDay = function(){
		var save = date.getDay();
		if(save == 0) save = 7; 
		return save;
	};
	Nowtime.prototype.nowTime = function(){
		var nh = this.nowHour;
		var nw = this.nowMinute;
		var ns = this.nowSecond;
		var ny = this.nowYear;
		var nm = this.nowMonth; 
		var nd = this.nowDate;
		var nd = this.nowDay()
		//下面用对象的方式来返回，但现在还没有做	
		if(arguments[0] == null || arguments[0] == true){
			return nh+':'+nw+':'+ns;
		}else if(arguments[0] == false){
			return ny+'/'+nm+'/'+nd+'/'+nh+':'+nw+':'+ns+'-星期'+nd;
		}else{
			throw new Error('获取时间失败,可能是参数不对(参数是 Boolean)');
		}
	}
// 思考：怎么才能让再用连缀的时候也可以不返回连连缀前面函数或属性的过程
/*
		var Obj = function(){
			this.color ='red';
			this.time = function(){
				return '你引用到了 time 函数了';
				return this;
			}
		}
		var obj = new Obj();
		alert(obj.time());		//我要返回 '你引用...' 这一话
		alert(obj.time().color);//我要返回 'red'

*/
}


//下面则是一些常用函数
function fix(fixNumber,xj){
	var div = Math.pow(10,xj);
	fixNumber = Math.ceil(fixNumber * div)/div;
	return fixNumber;
}

function to12hours(value){
	switch(value){
		case 13:case 14:case 15:case 16:case 17:
		case 18:case 19:case 20:case 21:case 22:
		case 23:case 24:value -=12;break;
		default: value = value;
	}
	return value;
}

//元素默认选择阻止
function innerSelectStop(ele){
	ele.onselectstart = function(){
		return false;
	}
}

//移动对象
var Move = function(){
	this.ranges = 0;		//控制全局距离
	this.eles = [];
	
	Move.prototype.lastlocal = function(ele){
		ele.style.transition = '0s';
		ele.style.left = this.ranges+'px';
	}

	Move.prototype.toright = function(ele,distances,length){
		if(this.ranges == 0){
			this.ranges = -(length*distances);
		}
		this.ranges += distances;
		ele.style.left = this.ranges+'px';
		return this;
	}
	Move.prototype.toleft = function(ele,distances,length){
		this.ranges -= distances;
		if(this.ranges <= -(length*distances)){
			this.ranges = 0;
		}
		
		ele.style.left = this.ranges+'px';
		return this;
	}
}


// 确认
function queren(){
	return confirm("你确定！");
}
