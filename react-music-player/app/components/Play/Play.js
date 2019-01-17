import React, {Component} from 'react';
import InputRange from 'react-input-range';
import Slider from 'react-slick';
import classnames from 'classnames';

import Header from '../../components/Common/Header';
// 格式化时间
import {formatTime} from '../../util/tools';
// 本地存储
import * as localStore from '../../util/localStorage';

import 'babel-polyfill';

import Loading from '../../components/Common/Loading';

export default class Player extends Component {
	static defaultProps = {
		background: '-webkit-linear-gradient(#e9203d, #e9203d) no-repeat, #ddd',
		height:38, // 歌词每行高度
		// 歌词滑块的配置
		settings: {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		}
	};

	constructor(props) {
		super(props);

	}

	componentDidMount(){
		// 当页面一旦被挂载后，利用地址的 hash 得到音乐
		const hash = this.props.location.hash.replace(/#/, '');
		// console.log('Play componentDidMount >>', hash, this.props.music);
		if ( hash && hash !== 'null' ) {
			// 获取音乐 hash
			this.props.musicInfoActions.getMusic({ hash });
			// 请求该音乐
			this.props.musicInfoActions.fetchMusic(hash);
			// 改变初始状态
			this.props.musicInfoActions.control({playing: true});
		}
	}

	// 获取当前播放的歌曲
	getCurrentSong(){
		const musicList = this.props.musicList;
		const hash = this.props.music.hash;
		let currentSong = null;
		if (musicList.length > 0 && hash) {
			musicList.map((ele) => {
				if (ele.song.hash === hash) {
					currentSong = ele;
				}
			})
		}
		// console.log('Play getCurrentSong', currentSong)
		// return {
		// 	song:{},
		// 	
		// }
		return currentSong;
	}

	/*播放部分*/
	// 播放暂停
	playPause(e){
		// 将播放状态改变
		this.props.musicInfoActions.control({
			playing: !this.props.control.playing
		});
	}
	

	render() {
		console.log('Play render', this.props);
		// 首先要判断是否获取得到当前 song
		// 因为在网络在第一次渲染的时候可能没有那们快
		const current = this.getCurrentSong();
		if (current) {

			const currentSong = current.song;
			console.log('currentSong', currentSong);
			const albumImg = currentSong.imgUrl.replace(/\{size\}/g, 400);

			// 播放时间
			const currentTime = formatTime(this.props.progress.currentTime);
            const duration = formatTime(localStore.getItem('duration'));
            console.log('currentTime and duration ', currentTime, duration)
			// 百分比
			const percentage = 10;

			return(
				<div className="container-full">
					<div className="container-bg" style={{backgroundImage: `url(${albumImg})`}}></div>
					<div className="container-play">
						<Header
							title={currentSong.fileName}
							style={{background: 'transparent'}}/>
						<div className="container-inner">
							<div className="player-title">
								<div className="songName">{currentSong.songName}</div>
								<div className="singerName"> - {currentSong.singerName} -</div>
								<div className="dot">
									<i className="icon-more_horiz"
										onClick={ () => this.openDot}>
									</i>
								</div>
							</div>
							<Slider className="sliderContainer" {...this.props.settings} >
								<div className="content-player">
									<div className="components-album">
										<div className={classnames('album-pic', this.props.control.playing ? 'playing' : 'paused')}
											style={{background: `url(${albumImg}) center center`, backgroundSize: 'cover'}}>
										</div>
									</div>
								</div>
								<div className="lyric">
									<p>歌词</p>
									<p>歌词</p>
									<p>歌词</p>
									<p>歌词</p>
									<p>歌词</p>
									<p>歌词</p>
								</div>
							</Slider>
							<div className="components-player-control">
								<div className="player-time-box">
									<div className="time_left">{currentTime}</div>
									<div className="player-range">                                            
										<InputRange
											maxValue={100} 
											minValue={0} 
											value={percentage || 0}
											onChange={ value => this.onChange(value) } 
										/>
									</div>
									<div className="time_right">{duration}</div>
								</div>
								<div className="player-btn">
									<i className="icon-prev" 
										onClick={ e => this.playPrev(e) }></i>
									<i className={this.props.control.playing ? 'icon-pause' : 'icon-play'} 
										onClick={ e => this.playPause(e) }></i>
									<i className="icon-next" 
										onClick={ e => this.playNext(e) }></i>
									<i className="icon-list" 
										onClick={ e => this.showMusicList(e) }></i>
								</div>
							</div>
						</div>
					</div>

				</div>
			);   
		} else {
			return (
				<Loading/>
			)
		}
	}

}

