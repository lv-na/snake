function getClass(classname,obj){
	var obj=obj||document;  //用对象调用或者decument调用
	if(obj.getElementByClassName){
		return getElementByClassName(classname)
	}else{
		var arr=[];
		var alls=document.getElementsByTagName('*')
		for(var i=0;i<alls.length;i++){
			if(checkClass(alls[i].className,classname)){
				arr.push(alls[i])
			}
		}
		return arr;
	}
}
function checkClass(search,match){
	var brr=search.split(" ");
	for(i=0;i<brr.length;i++){
		if(brr[i]==match){
			return true;
		}
	}
	return false;
}

function getInner(obj,value){ //传一个对象返回内容值
	if(obj.textContent){   //在一般浏览器下，value可获取可设置
		if(value==undefined){  //如果不设置
			return obj.textContent;  //返回obj对象
		}else{
			obj.textContent=value;   //如果设置，返回value
		}
	}else{
		if(value==undefined){    //在IE6下
			return obj.innerText;
		}else{
			obj.innerText=value;
		}
	}
}

function getStyle(obj,style){   //获取嵌入样式和外部样式的属性
	if(obj.currentStyle){    //在IE6的获取方法
		return obj.currentStyle[style];
	}else{
		return getComputedStyle(obj,null)[style]; //在一般浏览器的获取方法
	}
}

function $(search,obj){    //获取调用某些标签里的某个元素
	var obj=obj||document; //ID和Name只能用document调用 TagName和ClassName都可以
	if(typeof(search)=="string"){
		if(search.charAt(0)=="#"){    //比较标签的第一个字符
			return document.getElementById(search.substr(1)); //若是#，返回ID
		}else if(search.charAt(0)=="."){
			return getClass(search.substr(1),obj)   //若是. 返回类名
		}else{
			return obj.getElementsByTagName(search) //以上都不是，则返回标签名
		}
	}else if(typeof(search)=="function"){
		window.onload=function(){
			search();
		}
	}
	
}

// 获取子节点  元素 节点  元素节点+文本节点
//   type         a            b
function getChilds(obj,type){
	var type=type||"a";
	var all=obj.childNodes;  //获取所有子节点
	var arr=[];   //定义一个空数组
	for(var i=0;i<all.length;i++){    //循环
		if(type=="a"){   //如果只获取元素节点
			if(all[i].nodeType==1){   //如果节点类型=1，则是元素节点
				arr.push(all[i]);   //将节点添加到数组
			}
		}else if(type=="b"){    //如果获取元素节点和文本节点
			if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,""))){
				// 满足条件 节点类型=1是元素节点或节点类型=3是文本节点  正则 用空替换空格
				arr.push(all[i])
			}
		}
	}
	return arr;
}
// 获取第一个子节点
function getFirst(obj){
	return getChilds(obj)[0];
}
// 获取最后一个子节点
function getLast(obj){
	var nub=getChilds(obj);
	return nub[nub.length-1];
}
// 获取下一个兄弟节点
function getNext(obj,type){
	var next=obj.nextSibling;
	var type=type||"a";
	if(next==null){      //如果没有下一个兄弟节点
		return false;       //则报错停止
	}
	if(type=="a"){
		while(next.nodeType==3||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
				return false
			}
		}
	}else if(type=="b"){
		while((next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,""))||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
				return false
			}
		}
	}
	return next
}
// 获取上一个兄弟节点
function getprevious(obj){
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(previous.nodeType==3||previous.nodeType==8){
		if(previous==null){
			return false
		}
	}
	return previous
}
// 插入到某个对象之前
function insertBefore(obj,before){
	var parent=before.parentNode;
	parent.insertBefore(obj,before)
}
// 插入到某个对象之后
function insertAfter(obj,after){
	var parent=after.parentNode;
	var next=getNext(after,"b");
	if(next){
		insertBefore(obj,next)
	}else{
		parent.appendChild(obj)
	}
}

function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent("on"+event,fun)
	}else if(obj.addEventListener){
		obj.addEventListener(event,fun,false)
	}
}
function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent("on"+event,fun)
	}else if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false)
	}
}
function mouseWheel(obj,funUp,funDown){
	if(obj.attachEvent){
		obj.attachEvent("onmouse",scroll)
	}else if(obj.addEventListener){
		obj.addEventListener("DOMMouseScroll",scroll,false)
		obj.addEventListener("mousewheel",scroll,false)
	}
	function scroll(e){
		var ev=e||window.event
		var d=ev.wheelDelta||ev.detail
		if(d==-120||d==3){
			if(funDown){
				funDown()
			}
		}else if(d==120||d==-3){
			if(funUp){
				funUp()
			}
		}
	}
}