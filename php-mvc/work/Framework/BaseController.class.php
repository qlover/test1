<?php
class BaseController{
	
	function __construct(){
		header('content-type:text/html; charset=utf-8');

	}

	function gotoURL( $url, $time = 3, $msg=''){
		echo "<p>$msg</p>";
		echo "<a href='{$url}'>返回</a>";
		echo "<p>页面将在<span id='seconds'>{$time}</span>秒后自动跳转</p>";
		header("refresh:$time; url=$url");
		echo "<script src='scripts/general.js'></script>";
	}

}