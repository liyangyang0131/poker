window.onload = function(){
	var $ = function(id){
		return document.getElementById(id); 
	};
	var 
	center = $('center'),
	moveLeft = $('moveLeft'),
	moveRight = $('moveRight'),
	nextButton = $('nextButton'),
	againButton = $('againButton'),
	win = $('win'),
	zhezhao = $('zhezhao'),
	word = $('word'),
	btn = $('btn');
	var previous;

	var cardStyle = function(){
		var bgs = ['hongtao1','heitao1','meihua1','fangpian1'];
		var dic = {},card = [];
		while(card.length !== 52){
			var bg = bgs[Math.floor(Math.random()*4)];
			var number = Math.floor(Math.random()*13+1);
			var key = bg + number;
			// console.log(key);
			if(!dic[key]){
				card.push({bg:bg,number:number});
				dic[key] = true;
			}
		}
		return card;
	};

	var index = 0;
	var card = cardStyle();
	// console.log(card);
	var div;
	var guize = {1:'A',11:'J',12:'Q',13:'K'};
	for(var i = 0;i<7;i++){
		for(var j = 0;j<i+1;j++){
			div = document.createElement('div');
			div.setAttribute('class','playcard');
			div.setAttribute('id',i+'_'+j);
			div.style.top = 45*i+'px';
			div.style.left=(6-i)*85+j*170+'px';
			// div.style.left=(6-i)*50+j*80+'px';
			div.setAttribute('data',card[index].number);
			if(guize[ card[index].number ]){
				div.innerHTML = guize[ card[index].number ];
			}
			else{
				div.innerHTML = card[index].number;
			}
			div.style.backgroundImage='url(./images/'+card[index].bg + '.jpg)';
			if(card[index].bg == 'hongtao1' || card[index].bg == 'fangpian1'){
				div.style.color = 'rgb(231, 0, 0)';
			}
			center.appendChild(div);
			index++;
		}
	}
	for(i = 0;i < 24;i++){
		div = document.createElement('div');
		div.setAttribute('class','playcard');
		div.setAttribute('data',card[index].number);
		if(guize[ card[index].number ]){
			div.innerHTML = guize[ card[index].number ];
		}
		else{
			div.innerHTML = card[index].number;
		}
		div.style.backgroundImage='url(./images/'+card[index].bg + '.jpg)';
		if(card[index].bg == 'hongtao1' || card[index].bg == 'fangpian1'){
			div.style.color = 'rgb(231, 0, 0)';
		}
		moveLeft.appendChild(div);
		index++;
	}

	isFree = function(el){
		var x = Number(el.id.split('_')[0]),
			y = Number(el.id.split('_')[1]),
			childLeftId = (x+1)+'_'+y,
			childRightId = (x+1)+'_'+(y+1);
		if($(childLeftId) || $(childRightId)){
			return false;
		}
		else{
			return true;
		}
	};

	center.onclick = function(e){
		var el = e.target;
		// console.log(el.parentElement);
		if(el == this || el == moveLeft || el == moveRight || el.hasAttribute('id') && !isFree(el) ){
			if(previous){
				previous.style.border = 'none';
				previous = null;
			}
			return null;
		}
		if(el.getAttribute('data') == '13'){
			el.parentElement.removeChild(el);
			return null;
		}
		if( previous && Number(previous.getAttribute('data')) + Number(el.getAttribute('data')) == 13 ){
	        previous.parentElement.removeChild(previous);
      		el.parentElement.removeChild(el);
      		//存在问题
      		// center.removeChild(previous);
      		// center.removeChild(el);
	        return null;;
        }
		if(previous){
			previous.style.border = 'none';
		}
		if( el.getAttribute('id') != 'nextButton' && el.getAttribute('id') != 'againButton'){
			el.style.border = '2px solid rgb(207, 155, 21)';
		}
		previous = el;
	};
	nextButton.onclick = function(){
		this.style.border='none';
		if( !moveLeft.children.length ){
			return null;
		}
		moveRight.appendChild(moveLeft.lastElementChild);
	};
	var count = 0;
	againButton.onclick = function(){
		this.style.border='none';
		if(count == 3 || moveLeft.children.length != 0) return;
		while(moveRight.children.length){
			moveLeft.appendChild(moveRight.lastElementChild);
		}
		count++;
		if(count > 3){
			win.style.display = 'block';
			win.style.backgroundImage = 'url(./images/meihua1.jpg)';
			zhezhao.style.display = 'block';
			word.innerHTML = '你失败了';
			word.style.color = '#F9BB85';
			btn.onclick = function(){
				location.reload();
			}
		}
		if(!card && !moveLeft && !moveRight){
			win.style.display = 'block';
			win.style.backgroundImage = 'url(./images/hongtao1.jpg)';
			zhezhao.style.display = 'block';
			word.innerHTML = '你赢了!';
			word.style.color = '#f9e855';
			btn.onclick = function(){
				location.reload();
			}
		}
	};
	center.onmousedown = function(e){
		e.preventDefault();
	};
	nextButton.onmousedown = function(e){
		e.preventDefault();
	};
	againButton.onmousedown = function(e){
		e.preventDefault();
	};


};