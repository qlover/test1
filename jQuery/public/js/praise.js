$(function() {
    var $praise = $('.praise'),
        $img = $('.praise-img'),
        $txt = $('.praise-txt'),
        numtxt = $txt.text(),
        $num = $('.praise-num'),
        stop = false, // 阻止事件流
        isAdd = false, // 默认初始不添加赞，因为事件函数中会取反
        imgurl = '../public/img/',
        timeout = function timeout() {
            $img.removeClass('anim');
            $num.removeClass('anim');
            stop = false;
        }
    $img.on('click', function(event) {
        if (stop) return;
        isAdd = !isAdd;
        stop = true;
        // 判断是加赞还是减少赞
        if (isAdd) {
            // console.log('add');
            $praise.css('color', '#eb4f38');
            $(this).addClass('anim').attr('src', imgurl + 'yizan.png');
            // 修改数字
            $txt.text(++numtxt);
            // 加1减1动画
            $num.text('+1').addClass('anim');
            // 每次执行完成取掉 anim 类属性
            setTimeout(timeout, 499);
        } else {
            // console.log('les');
            $praise.css('color', '#adcddd');
            $(this).addClass('anim').attr('src', imgurl + 'zan.png');
            // 修改数字
            $txt.text(--numtxt);
            // 加1减1动画 
            $num.text('-1').addClass('anim');
            // 每次执行完成取掉 anim 类属性
            setTimeout(timeout, 499);
        }
    });
});