 //定义一个自动执行函数
 (function(){
 	 var menuBar = function(){
	 	this.el = document.querySelector('#main ul');
	 	this.state = "allClosed";
	 	this.el.addEventListener('click',function(e){
            e.stopPropagation();
	 	});
	 	var self = this;
	 	this.menuList = document.querySelectorAll('#main ul > li');
	 	for(var i = 0;i<this.menuList.length;i++){
	 		this.menuList[i].addEventListener('click',function(){
	 			var elemCon = document.getElementById(e.currentTarget.id + '-content');
	 			console.log(elemcon);
	 		})
	 	}
	 }
	//声明一个构造函数
	 var Side =  function(Id,closeId){
	 	this.state = 'opened';
	 	this.elem = document.getElementById(Id || 'main');
	 	this.close = document.getElementById(closeId || 'close');
	 	this.MenuBar = new menuBar();
	 	var self = this;

	 	this.elem.addEventListener('click',function(event){
	 		if(event.target !== self.elem){
	 			self.triggerSwitch();
	 		}
	 	  },false);
	 	};

	 //将构造函数中的方法放在原型链中
	 Side.prototype.open = function(){
	 	// alert("open");
	 	console.log("side 被打开");
	 	this.state = 'opened';
	 };
	 Side.prototype.close = function(){
	 	// alert("close");
	 	console.log("side 被关闭");
	 	this.state = 'closed';
	 };
	 Side.prototype.triggerSwitch = function(){
         if(this.state === 'opened'){
         	this.close();
         }else{
         	this.open();
         }
	 };

	 var sideBar = new Side();
	

})();