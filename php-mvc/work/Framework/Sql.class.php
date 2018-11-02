<?php
class Sql{
	private $sqlinfo = array();
	private $lnk = null;
	private static $instance = null;
	static function getInstance( $cfg ){
		if( !isset( self::$instance )){
			self::$instance = new self( $cfg );
		}
		return self::$instance;
	}
	private function __construct( $cfg ){
		// 下面了保持数据有性效
		$this->sqlinfo['host'] = !empty( $cfg['host'] ) 
				? $cfg['host'] : "localhost";
		$this->sqlinfo['prot'] = !empty( $cfg['prot'] ) 
				? $cfg['prot'] : "3306";
		$this->sqlinfo['user'] = !empty( $cfg['user'] ) 
				? $cfg['user'] : "root";
		$this->sqlinfo['pass'] = !empty( $cfg['pass'] ) 
				? $cfg['pass'] : "";
		$this->sqlinfo['charset'] = !empty( $cfg['charset'] ) 
				? $cfg['charset'] : "utf8";
		$this->sqlinfo['dbname'] = !empty( $cfg['dbname'] ) 
				? $cfg['dbname'] : "praitce";

		$this->lnk = @mysql_connect("{$this->sqlinfo['host']}:{$this->sqlinfo['prot']}",
									"{$this->sqlinfo['user']}",
									"{$this->sqlinfo['pass']}")
									 or die('连接失败');

		$this->setChar( $this->sqlinfo['charset'] );
		$this->useDB( $this->sqlinfo['dbname'] );
	}
	function setChar( $char ){
		mysql_query("set names $char");
	}
	function useDB( $dbname ){
		mysql_query("use $dbname");
	}
	function closeDB(){
		mysql_close($this->lnk);
	}
	function sqlInfo(){
		echo "<br />地址：<span class=\"ipt\">{$this->host}</span>";
		echo "<br />用户名：$this->user";
		echo "<br />密码：$this->pass";
		echo "<br />编码：$this->charset";
		echo "<br />数据库：$this->dbname";
	}
	// 为执行的 sql 语句返回真假结果
	function exec( $sql ){
		$result = $this->query( $sql );
		return $result?true:false;
	}

	// 返回一条数据
	function getOneRow( $sql ){
		$result = $this->query( $sql );
		$rec = mysql_fetch_assoc( $result );
		if($rec === false){
			// echo '<span class="tip">没有你要的信息</span>';
			return false;
		}else{
			mysql_free_result( $result ); 
			return $rec;
		}
	}

	// 返回多条数据
	function getRows( $sql ){
		$result = $this->query( $sql );
		$rearr = array();
		while( $rec = mysql_fetch_array( $result, MYSQL_ASSOC) ){
			$rearr[] = $rec;
		}
		mysql_free_result( $result ); 
		return $rearr;
	}

	// 返回一个数据
	function getOneData( $sql ){
		$result = $this->query( $sql );
		$rec = mysql_fetch_row( $result );  
		$data = $rec[0];
		mysql_free_result( $result ); 
		return $data;
	}

	// 加密数据
	function encrypt( & $data,$method){
		switch($method){
			case 0:
				return md5($data);
			case 1:
				return crypt($data);
		}
	}

	// 检查错误
	private function query( $sql ){
		$result = mysql_query( $sql, $this->lnk);
		if( !$result ){
			echo "<h3>语句执行错误</h3>";
			echo "错误代号：" . mysql_errno() ."<br />";
			echo "错误信息：" . mysql_error() ."<br />";
			echo "错误语句：" . $sql ."<br />";
			die();		
		}
		return $result;
	}
}
	


