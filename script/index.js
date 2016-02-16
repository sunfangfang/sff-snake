window.onload=function(){
	var waikuang=document.getElementById('waikuang'),
		over=document.getElementById("over"),
		zhezhao=document.getElementById("zhezhao"),
		replay=document.getElementById('replay'),
		pause=document.getElementById("close"),
		guanqia=document.getElementById("guanqia"),
		nandu=document.getElementById("nandu"),
		jixu=document.getElementById("continue"),
		rongyi=document.getElementById("rongyi"),
		yiban=document.getElementById("yiban"),
		kunnan=document.getElementById("kunnan"),
		score=document.getElementById('score'),
		n=0,sudu=500,m=10,timerId,
		count=15,block,XX=Math.floor((600-count)/count)+'px',
		snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}],
		FOOD='#D6FF00',SNAKECOLOR='green',LEFT=37,UP=38,RIGHT=39,DOWN=40,DRE=RIGHT;
	for(var i=0;i<count;i++){
		for(var j=0;j<count;j++){
			block=document.createElement('div');
			block.setAttribute('class','block');
			block.style.width=XX;
			block.style.height=XX;
			block.setAttribute('id',i+'-'+j);
			waikuang.appendChild(block);

		}
	}
	var hasSnake=function(cc,dd){
		for(var i=0;i<snake.length;i++){
			if(cc==snake[i].x&&dd==snake[i].y){
				return true;
			}
		}
	};
	var blocks=document.getElementsByClassName('block');
	for(var i=0;i<snake.length;i++){
		blocks[i].style.background=SNAKECOLOR;
	}
	var dropFood=function(){
		var foodX=Math.floor(Math.random()*15);
		var foodY=Math.floor(Math.random()*15);
		if(hasSnake(foodX,foodY)){
			foodX=Math.floor(Math.random()*15);
			foodY=Math.floor(Math.random()*15);
		}
		document.getElementById(foodX+'-'+foodY).style.background=FOOD;
		return {foodx:foodX,foody:foodY};
	};
	var shiwu=dropFood();
	var zou=function(dir){
		DRE=dir;
		var last=snake.length-1,newHead;
		if(DRE==RIGHT){
			newHead=({x:snake[last].x,y:snake[last].y+1});
		}
		if(DRE==LEFT){
			newHead=({x:snake[last].x,y:snake[last].y-1});
		}
		if(DRE==UP){
			newHead=({x:snake[last].x-1,y:snake[last].y});
		}
		if(DRE==DOWN){
			newHead=({x:snake[last].x+1,y:snake[last].y});
		}
		if(newHead.x>14||newHead.x<0||newHead.y>14||newHead.y<0){
			clearInterval(timerId);
			over.style.display="block";
			return;
		}
		if(hasSnake(newHead.x,newHead.y)){
			clearInterval(timerId);
			over.style.display="block";
			return;
		}
		if(newHead.x==shiwu.foodx&&newHead.y==shiwu.foody){
			snake.push(newHead);
			document.getElementById(shiwu.foodx+'-'+shiwu.foody).style.background=SNAKECOLOR;
			n+=m;
			score.innerHTML=n;
			shiwu=dropFood();
			return null;
		}
		var weiba=snake.shift();
		snake.push(newHead);
		document.getElementById(weiba.x+'-'+weiba.y).style.background='none';
		document.getElementById(newHead.x+'-'+newHead.y).style.background=SNAKECOLOR;
	};
	document.onkeydown=function(e){
		var d=e.keyCode;
		if(d==37||d==38||d==39||d==40){
			if(Math.abs(d-DRE)!==2){
				clearInterval(timerId);
				zou(d);
				timerId=setInterval(function(){
					zou(DRE);
				},sudu);
			}
			
		}
	};
	zhezhao.onclick=function(){
		this.style.display="none";
		timerId=setInterval(function(){
			zou(DRE);
		},sudu);
	};
	over.onclick=function(){
		this.style.display="none";
		replace();
	};
	var replace=function(){
		n=0;
		score.innerHTML=n;
		clearInterval(timerId);
		DRE=RIGHT;
		snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		for(var i=0;i<blocks.length;i++){
			blocks[i].style.background='none';
		}
		for(var i=0;i<snake.length;i++){
			blocks[i].style.background=SNAKECOLOR;
		}
		shiwu=dropFood();
		timerId=setInterval(function(){
			zou(DRE);
		},sudu);
	};
	replay.onclick=function(){
		zhezhao.style.display="none";
		over.style.display="none";
		replace();
	};
	pause.onclick=function(){
		clearInterval(timerId);
	};

	jixu.onclick=function(){
		timerId=setInterval(function(){
			zou(DRE);
		},sudu);
	};
	guanqia.onmouseover=function(){
		nandu.style.display="block";
	};
	guanqia.onmouseout=function(){
		nandu.style.display="none";
	};
	rongyi.onclick=function(){
		sudu=500;
		m=10;
	};
	yiban.onclick=function(){
		sudu=300;
		m=15;
	};
	kunnan.onclick=function(){
		sudu=100;
		m=20;
	};




};
