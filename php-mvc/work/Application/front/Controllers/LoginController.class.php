<?php

class LoginController extends BaseController{

	function indexAction(){
		$lmo = ModelFactory::M('LoginModel');
		$data = $lmo->getAllUser();
		include './Application/front/Views/showLogin_view.html';
	}

	function deleteAction(){
		$lmo = ModelFactory::M('LoginModel');
		$lmo->delUserById( $_GET['id'] );
		echo "<h2>删除成功</h2>";
		echo '<a href="?">返回</a>';
	}

	function reviseAction(){
		$lmo = ModelFactory::M('LoginModel');
		$date = $lmo->getUserById( $_GET['id'] );
		include './Application/front/Views/updateLogin_View.html';
	}

	function updateAction(){
		$acc = $_POST['account'];
		$pass = $_POST['password'];
		$lmo = ModelFactory::M('LoginModel');
		$lmo->updateUser( 2, $acc, $pass);
		echo "<h2>修改成功</h2>";
		echo "<a href='?'>返回</a>";
	}

	function intrAction(){
		$lmo = ModelFactory::M('LoginModel');
		$data = $lmo->intrUser( $_GET['id'] );
		include './Application/front/Views/intrLogin_View.html';
	}

	function registerAction(){
		include './Application/front/Views/Login_register.html';
	}

	function addUserAction(){

		$account = $_POST['account'];
		$password = $_POST['password'];
		$lmo = ModelFactory::M('LoginModel');
		$lmo->insertUser( $account, $password);
		echo "<h2>注册成功</h2>";
		echo "<a href='?'>返回</a>";

	}


}



