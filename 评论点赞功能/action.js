window.onload = function(){
    	var ul = document.getElementById('list');
    	var lis = ul.getElementsByTagName('li');
        
         var time = document.getElementsByClassName('time');
                        //设置输入框中的事件
        var textarea = document.getElementsByTagName('textarea');
        var button = document.getElementsByTagName('button');
         for(var i = 0;i<time.length;i++){
            textarea[i].index = i;
            time[i].innerHTML = getTime();
                   //获取焦点事件
        textarea[i].onfocus = function(){
            button[this.index].className = 'btn';
            this.value = (this.value == '评论...') ? '' : this.value;
            this.style.height = '60px';
        }
        
        //鼠标弹起时的事件
        textarea[i].onkeyup = function(){
             var len = this.value.length;
             var button = this.parentNode.children[1];
             var word = this.parentNode.getElementsByClassName('length')[0];
             if(len == 0 || len>140){
                  button.className = 'btn btn-off';
             }else{
                button.className = 'btn';
             }
             word.innerHTML = len;

        }
        textarea[i].onblur = function(){
            if(this.value == ''){
                button[this.index].className = "btn btn-off";
                this.style.height = '30px';
                this.value = '评论...';
               }
            }
         }
 
    	for(var i=0;i<lis.length;i++){
              //获取时间

    		    lis[i].onclick = function(e){
    		  	  var event  = e || window.event;
    		  	  var elem = event.srcElement || event.target;
    		  	  var cls = elem.className;
    		  	  	switch(cls){
    		  	  		case 'close':
    		  	  		removeNode(elem.parentNode);
    		  	  		break;

    		  	  		case 'praise':
    		  	  		praise(elem.parentNode.parentNode.parentNode,elem);
    		  	  		break;

    		  	  		case 'btn':
                        makeComment(elem.parentNode.parentNode.parentNode);
                        break;

                        case "comment-praise":
                        praiseReply(elem);
                        break;

                        case "comment-action":
                        commentAction(li);
                        break;

    		  	  		

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
             for(var i=0,len = elements.length;i<len;i++){
                if(elements[i] == cls){
                    result.push(elements[i]);
                }
             }
             return result;
        }
    //点赞函数
    function praise(parent,node){
    	// var total = getClass(parent,'praise-total');
        var total = parent.getElementsByClassName('praise-total')['0'];
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

    //发表评论的函数
    function makeComment(box){
        var textarea = box.getElementsByTagName('textarea')[0];
        var list = box.getElementsByClassName('comment-list')[0];
        var li = document.createElement('li');
        li.setAttribute('user','self');
        li.className = 'comment';
        var html = '<img src="head.jpg">'+
                   '<div class="comment-box">'+
                   '<p class="comment-content">'+
                   '<span class="user">我:</span>'+ textarea.value + '</p>'+
                   '<p>'+
                   '<span class="comment-time">' + getTime() + '</span>'+
                   '<a href="javascript:;" class="comment-praise" total="1" my="0">1赞</a>'+
                   '<a href="javascript:;" class="comment-action">删除</a>'+
                   '</p>' + '</div>';
        li.innerHTML = html;
        list.appendChild(li);
        textarea.value = '评论...';
        textarea.style.height = '30px';
     }

     //赞回复功能
     function praiseReply(el){
        var total = parseInt(el.getAttribute('total'));
        var my = el.getAttribute('my');
        var newNum ;
        if(my == 0){
            newNum = total + 1;
            el.setAttribute('total',newNum);
            el.setAttribute('my',1);
            el.innerHTML = newNum + '取消赞';
        }else{
            newNum = total -1;
            el.setAttribute('total',newNum);
            el.setAttribute('my',0);
            el.innerHTML = (newNum == 0) ? '赞' : newNum + '赞';
        }
        el.style.display = (newNum == 0) ? '' : 'inline-block';
     }

     //回复评论的函数
     function commentAction(el){
           var box = el.parentNode.parentNode.parentNode;
           var BigBox = box.parentNode.parentNode.parentNode;
           var textarea = BigBox.getElementsByTagName('textarea')[0];
           var user = box.getElementsByClassName('user')[0];
           var t = el.innerHTML;
           if(t == '回复')
           {
             textarea.onfocus();
             textarea.value = '回复:'+user.innerHTML;
             textarea.onkeyup();
           }else{
             removeNode(box);
           }

     }
 };


