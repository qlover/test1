//这个是 replaceChild 的另一种
function replaceEach(aNode, bNode){
	var aParent = aNode.parentNode;
	var bParent = bNode.parentNode;
	if(aParent && bParent){
		var aNode2 = aNode.cloneNode(true);
		bParent.replaceChild(aNode2, bNode);
		aParent.replaceChild(bNode, aNode);
	}
}

//清掉字符串两边空格
function trim(str){
	var reg = /^\s*|\s*$/g;
	return str.replace(reg, "");
}

//insertBefore()
function insertAfter(newNode, refNode){
	var parNode = refNode.parentNode;
	if(parNode){
		var lastNode = refNode.lastNode;
		if(parNode == lastNode){
			parNode.appendChild(newNode);
		}else{
			var nextNode = refNode.nextSibling;
			parNode.insertBefore(newNode, nextNode);
		}
	}
}

//固定小数位数
function fix(fixNumber,decimalPlaces){
	var div = Math.pow(10,decimalPlaces);
	fixNumber = Math.round(fixNumber * div)/div;
	return fixNumber;
}

//checkLetter
function checkLetter(strObject)
{		
	var n= -1;
	for(var i=0; i < strObject.length; i++)
	{
		n++;
		var subStr = strObject.substr(0,n);
		var subChar = strObject.charCodeAt(n);
		if(subChar >= 'A'.charCodeAt(0) && subChar <= 'Z'.charCodeAt(0))
		{
			alert("第" + n + "个字符是大写的");
		}else if(subChar >= 'a'.charCodeAt(0) && subChar <= 'z'.charCodeAt(0))
		{
			alert("第" + n + "个字符是小写的");
		}
	}
}		

//迭代 map()
function doubleAndAlert(value,index,arry)
{
	var result = value ;//数组中的元素所以执行的代码，（这里用 value 表示了数组中的元素）
	return result;
}

//迭代forEach()
function DD(value){
	var result = value;
	alert(result);
}

//求和
function sum(){
	var sum = 0;
	var argLen = arguments.length;
	if(argLen == 0)return sum;
	for(var i=0; i < argLen; i++)	sum += arguments[i];
	return sum;
}

//平均值
function average(){
	var avg = 0;
	var argLen = arguments.length;
	if(argLen == 0){
		return avg;
	}	
	for(var i=0,l = argLen; i <l; i++){
		avg += arguments[i];
	}
	return Math.round(avg/argLen);
}

//sort() 用参数排序数组
function compare(f,s){
	var result;
	f<s?result =-1:(f>s?result=1:result =0);
	return result;
}

//跨浏览器鼠标按键兼容
function getButton(evt){
	var e = evt || window.event;
	if(evt){			//要把这个写前面，因为 chrome 支持 W3C 又支持 IE
		return e.button;
	}else{
		switch(e.button){
			case 1 : return 0;
			case 4 : return 1;
			case 2 : return 2;
			case 0 : return 2;	//为了兼容 360 IE 内核	
		}
	}
}


//跨浏览器添加事件
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,function (){
			fn.call(obj);
		});
	}
}
//跨浏览器移除事件
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	}else if(obj.detachEvent){
		obj.detachEvent('on' + type,fn);
	}
}

//跨浏览器阻止默认行为
function preDef(evt){
		var e = evt || window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}

//跨浏览器获取当前 DOM 元素
function getTarget(evt){
	var e = evt || window.event;
	if(e.target){
		return e.target;
	}else if(window.event.srcElement){
		return window.event.srcElement;
	}
}

//跨浏览器获取当前 DOM 元素的标签名
function getTagName(evt){
	var e = evt || window.event;
	if(e.target){		
		return e.target.tagName;
	}else if(window.event.srcElement){	
		return window.event.srcElement.tagName;
	}
}


//跨浏览器获取字符编码
function getCharCode(event){
	var e = event || window.event;
	if(typeof e.charCode == 'number'){
		return e.charCode;
	}else{
		return e.keyCode;
	}
}

//移除空白节点
function removeWhiteNode(node){
  for(var i=0; i< node.childNodes.length; i++){
     if(node.childNodes[i].nodeType === 3 &&/^\s$/.test(node.childNodes[i].nodeValue)){
        node.childNodes[i].parentNode.removeChild(node.childNodes[i]);		
    }			
  }
  return node;
}


//获取键值对URL
function getArgs(){
	var agrs = [];
	var qs = location.search.length>0 ? location.search.substring(1):'';
	var items = qs.split('&');
	var item = null,name = null,value= null;
	for(var i=0; i < items.length; i++){
		item = itmes[i].split('=');
		name = item[0];
		value = itme[1];
		args[name] = value;
	}
	return args;
}


//跨浏览器选择文本
function getSelectText(text,start,num){
	if(text.setSelectionRange){
		text.setSelectionRagne(start,num);
		text.focus();
	}else if(text.createTextRange){
		var range = text.createTextRange();
		range.collapse(true);
		range.moveStart('character',start);
		range.moveEnd('character',num - start);
		range.select();
	}
}


//跨浏览器获取选取的文本
function getSelectionText(text){
	if(typeof text.selectionStart == 'number'){
		return text.value.substring(text.selectionSatrt,text.selectionEnd);
	}else if(document.selection){
		return document.selection.createRange().text;
	}
}

//整理文本函数
function putinStr(id){
	var ele = document.getElementById(id);
	var str = ele.innerHTML;
	str = str.split('\n');
	str = str.join('<br>');
	ele.innerHTML = str;
}
//全部替换某个字符
function reStr(id,oldstr,newstr){
	var ele = document.getElementById(id);
	var str = ele.innerHTML;
	var reg = new RegExp(oldstr,'g');
	if(reg.test(str)){
		str = str.replace(reg,newstr);
	}
	ele.innerHTML = str;
}
//有序替换
function reOrder(id,oldstr,begin){
	var ele = document.getElementById(id);
	var n = '00' || begin;
	var str = ele.innerHTML;
	var reg = new RegExp(oldstr);
	for(var i=0; i < str.length; i++,n++){
		str = str.replace(reg,'_'+n);
	}
	ele.innerHTML = str;
}

// 随机 [min,max] 
function rand( min, max ){
	return Math.round(Math.random()*(max - min) + min);
}