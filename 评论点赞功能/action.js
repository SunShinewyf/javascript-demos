window.onload = function(){
    	var ul = document.getElementById('list');
    	var lis = ul.getElementsByTagName('li');

    	for(var i=0;i<lis.length;i++){
    		  lis[i].onclick = function(e){
    		  	  var event  = e || window.event;
    		  	  var elem = e.srcElement || e.target;
    		  	  var cls = elem.className;
    		  	  	switch(cls){
    		  	  		case 'close':
    		  	  		removeNode(elem.parentNode);
    		  	  		break;

    		  	  		case 'praise':
    		  	  		praise(elem.parentNode.parentNode.parentNode,elem);
    		  	  		break;

    		  	  		case 'btn':
    		  	  		

                        


    		  	  }
    		  }
    		}

    //删除节点的函数
    function removeNode(node){
    	node.parentNode.removeChild(node);
    }
    
    //获取类名为cls的dom节点
    function getClass(obj,cls){
    	var elems = obj.getElementsByTagName('*');
    	var result = [];
    	for(var i=0;i<elems.length;i++){
    		if(elems[i].className == cls){
    			result.push(elems[i]);
    		}
    	}
    	return result;
    }
    //点赞函数
    function praise(parent,node){
    	var total = getClass(parent,'praise-total')['0'];
    	var num = parseInt(total.getAttribute('total'));
    	var content = node.innerHTML;
    	var newNum;
    	if(content == '赞'){
    		newNum = num + 1;
    		total.innerHTML = (newNum == 1) ? "我觉得很赞" : '我和'+ num + '觉得很赞';
    		node.innerHTML = '取消赞';
    	}else{
    		newNum = num - 1;
    		total.innerHTML = (newNum == 0) ? ' ' : newNum + '个人觉得很赞';
    		node.innerHTML = '赞';
    	}
    	total.setAttribute('total',newNum); //设置属性
    	total.style.display = (newNum == 0) ? 'none' : 'block';
    }


 };
