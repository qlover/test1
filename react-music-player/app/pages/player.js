import React from 'react';

import Progress from '../components/progress';

import { Link } from 'react-router-dom';

import { formatTime } from '../utils/utils'

import PubSub from 'pubsub-js';

import './player.less';

let duration = null;

PubSub.currentMusicItem = {};
// 播放页面组件
class Player extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: '',
		}

	}

	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				leftTime: formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});

		// 监听，改变当前的 currentMusicItem 项目与 APP 中的一致
		PubSub.subscribe("CHANGE_ITEM", (msg, item) => {
			PubSub.currentMusicItem = item
		});

	}
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	}




	/**
	 * 播放部分
	 * 
	 */
	
	play() {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause");
		} else {
			$("#player").jPlayer("play");
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	}
	// 播放下一首
	next() {
		// 向 pubsub 发送消息
		PubSub.publish("PLAY_NEXT");
	}
	prev() {
		PubSub.publish("PLAY_PREV");
	}
	changeRepeat() {
		console.log('changeRepeat');
	}
	// 改变声音大小
	changeVolume(progress){
		$('#player').jPlayer('volume', progress);
	}
	// 改变进度条
	changeProgress(progress){
		$("#player").jPlayer("play", duration * progress);
		// this.setState({
		// 	isPlay: true
		// });
	}
	
	render() {
		return (
			<div className="player-page">
				<h1 className="caption"><Link to="/list">我的私人音乐坊</Link></h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{PubSub.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{PubSub.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-{this.state.leftTime}</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper">
									<Progress 
										progress={this.state.volume}
										barColor="#aaa"
										onProgressChange={ (e) => this.changeVolume(e)}>
									</Progress>
								</div>
							</div>
						</div>
						<div style={{height: 10, lineHeight: '10px'}}>
							<Progress
								progress={this.state.progress}
								onProgressChange={ (e) => this.changeProgress(e)}>
							</Progress>
						</div>
						<div className="mt35 row">
							<div>
								<i className="icon prev" 
									onClick={ (e) => this.prev(e) }></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} 
									onClick={ (e) => this.play(e) }></i>
								<i className="icon next ml20"
									onClick={ (e) => this.next(e) }></i>
							</div>
							<div className="-col-auto">
								<i className=""></i>
							</div>
						</div>
					</div>
					<div className="-col-auto cover">
						<img src={`${PubSub.currentMusicItem.cover}`} alt="音乐图片信息"/>
					</div>
				</div>
			</div>
		);
	}
}



export default Player;