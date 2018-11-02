import React from 'react';

import './progress.less';

// 进度条组件
class Progress extends React.Component {
	constructor(props){
		super(props);

	}

	changeProgress(e) {
		// ref 属性可以在父组件中能够引用到当前的组件
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	}

	render(){

		return(
			<div
				className="components-progress"
				ref="progressBar"
				onClick={ (e) => this.changeProgress(e) } >
				<div
					className="progress"
					style={{width: `${this.props.progress}%`, backgroundColor:`${this.props.barColor}`}}>
				</div>
			</div>
		);
	}
}


// 设置默认值
Progress.defaultProps = {
	// 进度条默认的颜色
	barColor: '#2f9842',
}



export default Progress;