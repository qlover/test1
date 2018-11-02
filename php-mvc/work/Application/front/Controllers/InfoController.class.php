<?php

class InfoController extends BaseController {

	function indexAction(){
		$imo = ModelFactory::M('InfoModel');
		$data = $imo->getAllUser();
		include './Application/front/Views/showInfo_view.html';
	}

	function deleteAction(){
		$imo = ModelFactory::M('InfoModel');
		$imo->delUserById( $_GET['id'] );
		echo "<h2>删除成功</h2>";
		echo '<a href="?">返回</a>';
	}

	function reviseAction(){
		$imo = ModelFactory::M('InfoModel');
		$data = $imo->getUserById( $_GET['id'] );
		$nick = $data['nick'];
		$account = $data['account'];
		$email = $data['email'];
		$password = $data['password'];
		$qq = $data['qq'];
		$telephone = $data['telephone'];
		$safety = $data['safety'];
		$age = $data['age'];
		$edu = $data['edu'];
		$data_hobby = explode( ',', $data['hobby'] );  // 将字符串用参数一分割成一维数组
		$data_address = explode('-', $data['address'] );		
		$zcode = $data['zcode'];
		$school = $data['school'];
		include './Application/front/Views/updateInfo_View.html';
	}

	function updateAction(){
		$nick = $_POST['nick'];
		$account = $_POST['account'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$qq = $_POST['qq'];
		$telephone = $_POST['telephone'];
		$safety = $_POST['safety'];
		$age = $_POST['age'];
		$edu = $_POST['edu'];
		$hobby = implode(',', $_POST['hobby'] );  // 将一维数组中的值用参数一连接起来
		$aes_province = $_POST['province'];
		$aes_city = $_POST['city'];
		$address = $aes_province .'-'. $aes_city;
		$zcode = $_POST['zcode'];
		$school = $_POST['school'];

		$imo = ModelFactory::M('InfoModel');
		$imo->updateUser( $_POST['id'], $nick, $account, $email, $password, $qq, $telephone, 
			$safety, $age, $edu, $hobby, $address, $zcode, $school );
		echo "<h2>修改成功</h2>";
		echo "<a href='?'>返回</a>";
	}

	function intrAction(){
		$imo = ModelFactory::M('InfoModel');
		$data = $imo->intrUser( $_GET['id'] );
		include './Application/front/Views/intrInfo_View.html';
	}

	function registerAction(){
		include './Application/front/Views/Info_register.html';
	}

	function addUserAction(){

		$nick = $_POST['nick'];
		$account = $_POST['account'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$qq = $_POST['qq'];
		$telephone = $_POST['telephone'];
		$safety = $_POST['safety'];
		$age = $_POST['age'];
		$edu = $_POST['edu'];
		$hobby = implode(',', $_POST['hobby'] );  // 将一维数组中的值用参数一连接起来
		$aes_province = $_POST['province'];
		$aes_city = $_POST['city'];
		$address = $aes_province .'-'. $aes_city;
		$zcode = $_POST['zcode'];
		$school = $_POST['school'];


		$imo = ModelFactory::M('InfoModel');
		$imo->insertUser( $nick, $account, $email, $password, $qq, $telephone, 
			$safety, $age, $edu, $hobby, $address, $zcode, $school );
		echo "<h2>注册成功</h2>";
		echo "<a href='?'>返回</a>";
	}


}

