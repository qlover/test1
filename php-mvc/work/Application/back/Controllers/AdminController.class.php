<?php

class AdminController extends BaseController {
	function loginAction(){
		include VIEW_PATH . 'login_View.html';
	}
	function checkAction(){
		// echo "正在验证信息，请稍后。。。";

		$a = $_POST['account'];

		$p = $_POST['password'];
		
		$co =  ModelFactory::M('CheckModel');
		$re = $co->checkLogin( $a, $p); 
		if( $re === true){
			echo "<h1>登录成功！</h1>";
		}else{
			echo "<h1>登录失败！请在检查你的用户名和密码是否正确</h1>";
			$this->gotoURL("?p=back&c=admin&a=login&account=$a");
		}
	}


}