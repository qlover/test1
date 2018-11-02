<?php
/*
* 用户模型类
*/
class UserModel extends BaseModel{

	function getAllUser(){
		$sql = "select * from user";
		$data = $this->_dao->getRows( $sql ); 
		return $data;
	}

	function getUserCount(){
		$sql = "select count(*) as cnt from user";
		$data = $this->_dao->getOneData( $sql );  // 获取一条数据 		
		return $data;
	}

	function getUserById( $id ){
		$sql = "select * from user where Id = $id";
		return $this->_dao->getOneRow( $sql );
	}

	function getUserByName( $name ){
		$sql = "select * from user where account = '{$name}' ";
		$data = $this->_dao->getOneRow( $sql );
		return $data;
	}

	function insertUser( $nick, $account, $email, $edu, $hobby, $address){
		$sql = "insert into ";
		$sql .= "user(nick,account,email,edu,hobby,address,registerTime)";
		$sql .= "values('$nick','$account','$email','$edu','$hobby','$address',now())";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function delUserById( $id ){
		$sql = "delete from user where Id = $id";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function intrUser( $id ){
		return $this->getUserById( $id );
	}

	function updateUser( $id, $nick, $account, $email, $edu, $hobby, $address){
		$sql = "update user set nick='$nick'";
		$sql .= ",account='$account'";
		$sql .= ",email='$email'";
		$sql .= ",edu='$edu'";
		$sql .= ",hobby='$hobby'";
		$sql .= ",address='$address'";
		$sql .= " where Id=$id";
		$data = $this->_dao->exec( $sql );
		return $data;		
	}



}
