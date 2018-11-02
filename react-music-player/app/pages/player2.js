import React from 'react';

import {
	Router,
	Link
} from 'react-router-dom';

import './player.less';

import Progress from '../components/progress';

import MUSIC_LIST from '../config/config';

// 设置默认值
Progress.defaultProps = {
	// 进度条默认的颜色
	barColor: '#2f9842',
}

// 播放页面组件
class Player extends React.Component {

	constructor(props) {
		super(props);

		// 首先定义一些播放需要的参数
		$("#player").jPlayer({
			ready: function(event) {
				$("#player").jPlayer("setMedia", {
					title: "Bubble",
					mp3: MUSIC_LIST[0].file,
					supplied: "mp3",
					wmode: "window",
				});
			},
		});


		this.state = {
			// 播放的音乐列表
			musicList: MUSIC_LIST,
			// 当前的音乐列表项
			currentMusicItem: MUSIC_LIST[0],
			// 播放进度条
			progress: 0,
			// 声音的大小,默认0.8,需要X100
			volume: 0.8,
			// 是否在播放
			isPlay: true,
			// 播放剩余时间
			leftTime: '',
			// 播放方式
			// 0 顺序
			// 1 随机
			// 2 单曲循环
			repeatType: 1
		};

		this.duration = null;

	}



	formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}

	// 当该组件渲染完成后
	componentWillMount() {

		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			// 播放进度
			let pgss = e.jPlayer.status.currentPercentAbsolute;
			let vol = e.jPlayer.options.volume * 100
			// console.log(pgss, vol)
			// 媒体的持续时间
			this.duration = e.jPlayer.status.duration
			// console.log(dur)
			// 利用播放进度得到播放时间
			let lt = this.formatTime(this.duration * (1 - pgss / 100))

			// 更新状态
			this.setState({
				progress: pgss,
				volume: vol,
				leftTime: lt
			});
		});


		$("#player").bind($.jPlayer.event.ended, (e) => {
			let state = this.state.repeatType;
			// 顺序播放
			if (state) {
				this.playNext();
			}
			// 随机播放
			else if (state == 1) {
				let index = this.rand(0, this.state.musicItem.length);
				this.playeMusic(this.state.musicList[index]);
			}
			// 单曲循环
			else if (state == 2) {
				this.playeMusic(this.state.currentMusicItem);
			}
		});

	}

	// 播放音乐，并指定当前播放的音乐列表
	playeMusic(item) {
		$("#player").jPlayer('setMedia', {
			mp3: item.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: item
		})
	}


	// 播放与暂停
	play(e) {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause")
		} else {
			$("#player").jPlayer("play")
		}

		this.setState({
			isPlay: !this.state.isPlay
		});
	}
	// 下一首
	next(e) {
		this.playNext();
	}
	// 上一首
	prev(e) {
		this.playNext('prev');
	}

	// [min, max]
	rand(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	// 播放下一首可以是上一首也可以是下一首
	playNext(type = 'next') {

		let index = this.getMusicId(this.state.currentMusicItem);
		let listLen = this.state.musicList.length;
		let musicItem = {};
		index = type == 'next' ? ((index + 1) % listLen) : ((index + listLen - 1) % listLen);

		musicItem = this.state.musicList[index]
		this.setState({
			currentMusicItem: musicItem
		});

		this.playeMusic(musicItem);
	}


	getMusicId(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	}

	render() {
		return (
			<div className="player-page">
				<h1 className="caption"><Link to="/list">我的私人音乐坊</Link></h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.state.currentMusicItem.title}</h2>
						<h3 className="music-artist mt10">{this.state.currentMusicItem.artist}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-{this.state.leftTime}</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper">
									<Progress 
										progress={this.state.volume}
										barColor="#aaa">
									</Progress>
								</div>
							</div>
						</div>
						<div style={{height: 10, lineHeight: '10px'}}>
							<Progress progress={this.state.progress}></Progress>
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
						<img src={`${this.state.currentMusicItem.cover}`} alt="音乐图片信息"/>
					</div>
				</div>
			</div>
		);
	}
}

export default Player;