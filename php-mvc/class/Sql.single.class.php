<?php
// 单例 Sql 类
class Sql{

	/*private $host;
	private $user;
	private $pass;
	private $charset;
	private $dbname;*/

	private $sqlinfo = array();

	private $lnk = null;

	// 2.定义一个静态属性，初始为 null
	private static $instance = null;
	// 3.定义一个静态方法，从中判断对象的数量
	static function getInstance( $cfg ){
		if( !isset( self::$instance )){
			self::$instance = new self( $cfg );
		}
		return self::$instance;
	}


	// 构造函数
	private function __construct( $cfg ){

		// 下面了保持数据有性效
		$this->sqlinfo['host'] = !empty($cfg['host'])? $cfg['host']: "localhost";
		$this->sqlinfo['user'] = !empty($cfg['user'])? $cfg['user']: "root";
		$this->sqlinfo['password'] = !empty($cfg['password'])? $cfg['password']: "";
		$this->sqlinfo['charset'] = !empty($cfg['charset'])? $cfg['charset']: "utf8";
		$this->sqlinfo['dbname'] = !empty($cfg['dbname'])? $cfg['dbname']: "praitce";

		$this->lnk = @mysql_connect("{$this->sqlinfo['host']}","{$this->sqlinfo['user']}","{$this->sqlinfo['password']}") or die('连接失败');
		$this->setChar( $this->sqlinfo['charset'] );
		$this->useDB( $this->sqlinfo['dbname'] );
	}
	
	// 设置编码
	function setChar( $char ){
		mysql_query("set names $char");
	}
	// 选择选择库
	function useDB( $dbname ){
		mysql_query("use $dbname");
	}
	// 关闭连接到数据库
	function closeDB(){
		mysql_close($this->lnk);
	}
	// 返回当前 sql 的连接信息
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
			echo '<span class="tip">没有你要的信息</span>';
		}else{
			// 提前释放资源，否则要等到页面结束才自动销毁
			// 以免消费内存消耗
			mysql_free_result( $result ); 
			return $rec;
		}
	}

	// 返回多条数据
	function getRows( $sql ){
		$result = $this->query( $sql );
		$rearr = array();   // 用于存放返回结果的二维数据，并且下标为索引下标
		// 用 mysql_fetch_array 只返回索引下标，MYSQL_ASSOC 返回字符下标
		// MYSQL_BOTH 两者都返回，且默认
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
		// mysql_query() 可以有两个参数，参数二则是用那一个连接
		// 如果省略则是有最近一次的连接
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

	// 实现单例
	// 1.私有化构造函数
	// 2.定义私有静态属性存放唯一对象
	// 3.定义一个判断对象数量的私有方法
}
	


