
// 实现视差滚动 


/**
 * 一 布局
 * 1.一个视图层 .cont，一个滚动层 .slider，
 * 2.一个索引下标点层 .nav
 * 3.6张图片，有6个小画框 .slide ，并且在小画框下用一个层来存放一张图片
 * 4.每张小画框层像普通的滚动横放，但是绝对定位
 * 5.每张小画框下的图片层同样绝对定位小画框层
 * 		并且要让图片层 -50% 让其向前溢出小画框层
 * 6.布局完成，后以滚动层每次 -100% 滚动，每张图片层就以 50% 相加
 * 		达到 ，两层的不同滚动来做到视差的效果
 */



/**
 * 行为控制
 *
 * 1.滚动层向左滚动 -100% 则 每张图片层向右滚动 50%
 * 2.用一个属性来控制当前的下标，但是这个点要法与之前不同，详细可见 pagination() 方法
 * 3. $current 属性也重要，因为该属性可以指向 doing 后的点，原理上是先++ 再执行反方向滚动
 * 
 * 
 */



$(document).ready(function() {
    var $cont = $('.cont'),
        $slider = $('.slider'),
        $nav = $('.nav');


    var winW = $(window).width();

    var speed = 1000; // 图片滚动的速度
    var distOfLetGo = winW * 0.2;

    var current = 1; // 记录当前的图片下标索引值 
    var animation = false;   // 控制动画函数节流
    var diff = 0;
    var numOfCities = 5; // 总共索引值
    var autoID = null;  // 自动滚动ID

    // Navigation
    function bullets(dir) {
        $('.drops' + current).removeClass('active');
        $('.drops' + dir).addClass('active');
    }

    // 设置动画超时
    // 也就是停止当前动画
    function timeout() {
        animation = false;
    }

    // 主要函数
    function pagination(direction) {
        var cd = current - direction;
        // console.log(cd);
        animation = true;
        diff = 0;
        $slider.addClass('animation').css({
            'transform': 'translate3d(-' + (cd) * 100 + '%, 0, 0)'
        }).find('.darkbg').css({
            'transform': 'translate3d(' + (cd) * 50 + '%, 0, 0)'
        });
    }

    // 向右移动
    function navigateRight() {
        if (current >= numOfCities) return;
        pagination(0);
        setTimeout(timeout, speed);
        bullets(current + 1);
        current++;
    }

    // 向左移动
    function navigateLeft() {
        if (current <= 1) return;
        pagination(2);
        setTimeout(timeout, speed);
        bullets(current - 1);
        current--;
    }

    // 当前停留
    function toDefault() {
        pagination(1);
        setTimeout(timeout, speed);
    }

  
    /**
     *  
     * 页面事件  
     * 一拖动开始
     * 二拖动结束
     * 
     */
    


    /*
     * 拖动事件开始 
     */
    $(document).on('mousedown touchstart', '.slide', function(e) {
        if (animation) return;
        var target = +$(this).attr('data-target');
        var startX = e.pageX //|| e.originalEvent.touches[0].pageX;


        $slider.removeClass('animation');
        $(document).on('mousemove touchmove', function(e) {
            var x = e.pageX //|| e.originalEvent.touches[0].pageX;
            diff = startX - x;
            if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;
            $slider.css({
                'transform': 'translate3d(-' + ((current - 1) * 100 + diff / 30) + '%, 0, 0)'
            }).find('.darkbg').css({
                'transform': 'translate3d(' + ((current - 1) * 50 + diff / 60) + '%, 0, 0)'
            });
        });
    });

    /*
     * 拖动事件结束
     */
    $(document).on('mouseup touchend', function(e) {
        $(document).off('mousemove touchmove');
        if (animation) return;
        if (diff >= distOfLetGo) {
            navigateRight();
        } else if (diff <= -distOfLetGo) {
            navigateLeft();
        } else {
            toDefault();
        }
    });

    // 下标索引切换事件
    $(document).on('click', '.drops:not(.active)', function() {
        var target = +$(this).attr('data-target');
        bullets(target);
        current = target;
        pagination(1);
    });
    // 左右切换点击事件
    $(document).on('click', '.pn', function() {
        var target = $(this).attr('data-target');
        if (target === 'right') navigateRight();
        if (target === 'left') navigateLeft();
    });
    // 键盘事件
    $(document).on('keydown', function(e) {
        if (e.which === 39) navigateRight();
        if (e.which === 37) navigateLeft();
    });
    // 滚轮事件
    $(document).on('mousewheel DOMMouseScroll', function(e) {
        if (animation) return;
        var delta = e.originalEvent.wheelDelta;
        if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
        if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
    });


}).on('selectstart', function(event) {
    event.preventDefault();
});



