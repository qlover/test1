import React from 'react';
import './logo.less';

// 顶部 logo 组件
class Logo extends React.Component {
	render() {
		return (
			<div className="row components-logo">
        		<img src="/public/images/logo.png" width="40" alt="" className="-col-auto"/>
        		<h1 className="caption">Music Player Build By React</h1>
        	</div>
		);
	}
}

export default Logo;