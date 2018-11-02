<?php
class InfoModel extends BaseModel{

	function getAllUser(){
		$sql = "select * from info";
		$data = $this->_dao->getRows( $sql ); 
		return $data;
	}

	function getUserCount(){
		$sql = "select count(*) as cnt from info";
		$data = $this->_dao->getOneData( $sql );  // 获取一条数据 		
		return $data;
	}

	function getUserById( $id ){
		$sql = "select * from info where Id = $id";
		return $this->_dao->getOneRow( $sql );
	}

	function getUserByName( $name ){
		$sql = "select * from info where account = '{$name}' ";
		$data = $this->_dao->getOneRow( $sql );
		return $data;
	}

	function insertUser( $nick, $account, $email, $password, $qq, $telephone, 
		$safety, $age, $edu, $hobby, $address, $zcode, $school ){
		$sql  = "insert into ";
		$sql .= "info(nick,account,password,email,qq,telephone";
		$sql .= ",safety,age,edu,hobby,address,zcode,school)";
		$sql .= "values('$nick','$account','$password','$email','$qq','$telephone'";
		$sql .= ",'$safety','$age','$edu','$hobby','$address','$zcode','$school')";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function delUserById( $id ){
		$sql = "delete from info where Id = $id";
		$data = $this->_dao->exec( $sql );
		return $data;
	}

	function intrUser( $id ){
		return $this->getUserById( $id );
	}

	function updateUser( $id, $nick, $account, $email, $password, $qq, $telephone, 
			$safety, $age, $edu, $hobby, $address, $zcode, $school ){
		$sql = "update info set nick='$nick'";
		$sql .= ",account='$account'";
		$sql .= ",email='$email'";
		if( $password !== ''){
			$sql .= ",password='$password'";
		}
		$sql .= ",qq='$qq'";
		$sql .= ",telephone='$telephone'";
		$sql .= ",safety='$safety'";
		$sql .= ",age='$age'";
		$sql .= ",edu='$edu'";
		$sql .= ",hobby='$hobby'";
		$sql .= ",address='$address'";
		$sql .= ",zcode='$zcode'";
		$sql .= ",zcode='$zcode'";
		$sql .= ",school='$school'";
		$sql .= " where Id=$id";
		$data = $this->_dao->exec( $sql );
		return $data;		
	}



}
