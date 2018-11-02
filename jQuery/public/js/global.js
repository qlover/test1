// global javascript document
// Forbiden page selected 
function fobidPageSel(){ 
	$('body').on('selectstart',false);
}

$(function(){
	//append background
	var $back = $('<div id="gradientBack"></div>');
	$('body>:first').before($back);
	
	$('.centerWindow').click(function() {
		$(this).hide(100);
	});


	
	// random images
	$('img').each(function(i){
		var cd = Math.round(Math.random()*(48 - 1) + 1);
		$(this).attr('src', '../public/img/ran_'+ cd + '.jpg');
	});	
	

	


});