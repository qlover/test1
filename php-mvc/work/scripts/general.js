
(function(){

	var second = document.getElementById('seconds');
	var t = second.innerHTML;
	var timer = setInterval(function(){
		if( t > 0 ){
			second.innerHTML = t;
			t--;
		}else{
			return ;
		}
	}, 1000);


})();



