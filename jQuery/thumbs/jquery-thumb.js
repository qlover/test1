
/**
 * @param {Array} config 设置图片颜色的参数
 *                       参数对应：
 *                       	点击前后文本颜色，点击前后字样，点击前后图片地址
 *                       
 * @example
 * 		css: thumbs.css
 *  	html:
 *  		+.praise
 *  			+Apraise
 *  				-.praise-img
 *  			-.praise-txt
 *  			-.praise-num
 *     js:
 *     	$('.praise').thumb();
 *  		
 */

jQuery.fn.thumb = function(config){

    var 
    	_this = $(this),

    	$img = _this.find('.praise-img'),

        $txt = _this.find('.praise-txt'),

        $num = _this.find('.praise-num'),

        stop = false, // 阻止事件流
        
        isAdd = false, // 默认初始不添加赞，因为事件函数中会取反
         
        cfg = config || [
        	'#adcddd',
        	'#eb4f38', 
        	'-1',
        	'+1',
        	'../public/img/zan.png',
        	'../public/img/yizan.png'
        ];

    $img.on('click', function(event) {

        if (stop) return false;

        stop = true;

        isAdd = !isAdd;

	    (function(i){

	        var txt = $txt.text();

	        _this.css('color', cfg[i]);

	        $img.addClass('anim').attr('src', cfg[i+4]);

	        $txt.text( (isAdd ? ++txt : --txt ) );

	        $num.text( cfg[i+2] ).addClass('anim');

	    	setTimeout(function(){

	            $img.removeClass('anim');

	            $num.removeClass('anim');

	            stop = false;

        	}, 499);

	    }(+isAdd));

    });

};



