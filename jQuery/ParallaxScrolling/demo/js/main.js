'use strict';
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



    // 默认添加第一个下标点的选中
    $('.drops--1').addClass('active');

    // Navigation
    function bullets(dir) {
        $('.drops--' + current).removeClass('active');
        $('.drops--' + dir).addClass('active');
    }


    // 设置动画超时
    // 也就是停止当前动画
    function timeout() {
        animation = false;
    }

    // 主要函数
    function pagination(direction) {
        var cd = current - direction;
        console.log(cd);
        animation = true;
        diff = 0;
        $slider.addClass('animation');
        $slider.css({
            'transform': 'translate3d(-' + (cd) * 100 + '%, 0, 0)'
        });
        $slider.find('.darkbg').css({
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
            });
            $slider.find('.darkbg').css({
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


    // 自动滚动

});