<?php

class CheckModel {
	protected $_dao = null;

	function __construct(){
		$config = array(
			'host' => 'localhost',
			'user' => 'root',
			'prot' => '3306',
			'pass' => 'root123',
			'char' => 'utf8',
			'dbname' => 'test'
		);
		$this->_dao = Sql::getInstance( $config ); 
	}

	public function checkLogin ( $account, $pass) {
		$sql = "select * from login where account = '{$account}' and password = '{$pass}'";
		$result = $this->_dao->getOneRow( $sql );
		// 在 Sql 类 63 添加一段返回 false 
		if( $result !== false ){
			return true;
		}else{
			return false;
		}
	}

}
