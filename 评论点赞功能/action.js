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

     //修改日期的表示形式
     function change(num){
        if(num < 10){
            num = '0'+num;
        }
        return num;
     }
     
     //获得时间的函数
     function getTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        month = change(month);
        day = change(day);
        hour = change(hour);
        min = change(min);
        var str = year+"-"+month+"-"+day+"&nbsp;&nbsp;"+hour+":"+min;

        return str;
     }

    //删除节点的函数
    function removeNode(node){
    	node.parentNode.removeChild(node);
    }
    
    //获取类名为cls的dom节点
       function getClass(obj,cls){
             var elements = obj.getElementsByTagName('*');
             var result = [];
             var testReg = new RegExp("(^|\s)" + cls + "(\s|$)"); 
             for(var i=0;i<elements.length;i++){
                if(testReg.test(elements[i])){
                    result.push(elements[i]);
                }
             }
             return result;
        }
    //点赞函数
    function praise(parent,node){
    	var total = getClass(parent,'praise-total')[0];
        // alert(total);
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

    // //发表评论的函数
    // function makeComment(box){
    //     var textarea
    // }
 };
