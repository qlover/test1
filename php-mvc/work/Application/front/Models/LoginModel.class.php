<?php
/*
* 登录模型类
*/
class LoginModel extends BaseModel{

	function getAllUser(){
		$sql = "select * from login";
		$data = $this->_dao->getRows( $sql ); 
		return $data;
	}

	function getUserCount(){
		$sql = "select count(*) as cnt from login";
		$data = $this->_dao->getOneData( $sql );  // 获取一条数据 		
		return $data;
	}

	function getUserById( $id ){
		$sql = "select * from login where Id = $id";
		return $this->_dao->getOneRow( $sql );
	}

	function getUserByName( $name ){
		$sql = "select * from login where account = '{$name}' ";
		$data = $this->_dao->getOneRow( $sql );
		return $data;
	}

	function insertUser( $account, $password ){
		$sql = "insert into login(account,password,loginTime)values(";
		$sql .= "'$account','$password',now())";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function delUserById( $id ){
		$sql = "delete from login where Id = $id";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function intrUser( $id ){
		return $this->getUserById( $id );
	}

	function updateUser( $id, $acc, $pass){
		$sql = "update login set account='$acc'";
		if( $pass !== ''){
			$sql .= ",password='$pass'";
		}                    
		$sql .= ",loginTime=now()";
		$sql .= " where Id=$id";
		$data = $this->_dao->exec( $sql );
		return $data;		
	}



}
