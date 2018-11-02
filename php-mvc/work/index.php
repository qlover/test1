<?php
/**
 * 添加验证码
 * 
 */

$p = !empty($_GET['p']) ? $_GET['p'] : 'front';  // 确认平台
$c = !empty($_GET['c']) ? $_GET['c'] : 'Login' ;   // 确认控制器
$a = !empty($_GET['a']) ? $_GET['a'] : 'index' ;  // 确认动作

define('PLAT', $p); // 平台
define('DS', DIRECTORY_SEPARATOR ); // 路径的分割符，用预定义常量来做常量值
define('ROOT', __DIR__ . DS);  //当前目录
define('APP', ROOT . 'Application' . DS); // applaction 完整路径
define('FRAMEWORK', ROOT . 'Framework' . DS);  // framework 完整路径
define('PLAT_PATH', APP . PLAT . DS); // 当前平台所有目录
define('CTRL_PATH', PLAT_PATH . 'Controllers' . DS); // 当前控制器所有目录
define('MODEL_PATH', PLAT_PATH . 'Models' . DS);  // 当前模型类所有路径
define('VIEW_PATH', PLAT_PATH . 'Views' . DS);

// 自动加载 
function __autoload( $className ){
	$base = array('Sql','BaseModel','BaseController','ModelFactory','CheckModel');
	if ( in_array( $className, $base) ) {
		require FRAMEWORK  . $className .'.class.php';
	}elseif ( substr( $className, -5) === 'Model') {
		require MODEL_PATH . $className .'.class.php';
	}elseif( substr( $className , -10) === 'Controller'){
		require CTRL_PATH . $className .'.class.php';
	}
// 自动加载不能加载视图文件 
}
$controller_name = $c . 'Controller';
$ctrl = new $controller_name();  
$action = $a . 'Action';
$ctrl->$action();

//  脚本控制暂时没写