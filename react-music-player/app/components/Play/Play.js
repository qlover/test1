import React, {Component} from 'react';
import InputRange from 'react-input-range';
import Slider from 'react-slick';
import classnames from 'classnames';

import Header from '../../components/Common/Header';
// 格式化时间
import {formatTime} from '../../util/tools';
import {getCurrentSong} from '../../util/Music';
// 本地存储
import * as localStore from '../../util/localStorage';
// 转 es6 语法
import 'babel-polyfill';
// 导入加载
import Loading from '../../components/Common/Loading';
// 导入播放列表组件
import MusicList from '../../containers/Home/MusicList';


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

		this.state = {
			loaded: false,
			// 是否显示播放列表层
			modal: false,
			dot: false,
			volumed: true, // 是否静音,
			// 当前进度
			progress: localStore.getItem('currentVolume') ?
				localStore.getItem('currentVolume') * 100 + '%' :
					this.props.volumeReducer.volume * 100 + '%', // 声音进度条进度
		};


	}

	componentDidMount(){
		// 当页面一旦被挂载后，利用地址的 hash 得到音乐
		const hash = this.props.location.hash.replace(/#/, '');
		// console.log('Play componentDidMount >>', hash, this.props.music);
		if ( hash && hash !== 'null' ) {
			// 获取音乐 hash
			this.props.musicActions.getMusicByHash({ hash });
			// 请求该音乐
			this.props.musicActions.fetchMusic(hash);
			// 改变初始状态
			this.props.musicActions.playControl({playing: true});
		}
	}

	

	favouriteStyle() {
		return this.props.favoriteMusic.toString().indexOf(this.props.music.hash) > -1 ? {color: 'rgb(233, 32, 61)'} : {color: ''};
	}

	setSVG() {
		const svg1 = '/public/css/svg/svg-1.svg';
		const svg2 = '/public/css/svg/svg-2.svg';
		return this.state.volumed ? {backgroundImage: `url(${svg1})`} : {backgroundImage: `url(${svg2})`};
	}

	setVolume(){
		const currentVolume = localStore.getItem('currentVolume');
		this.setState({volumed: !this.state.volumed});
		// 如果是静音
		if (this.state.volumed) {
			// 设置音量为 0
			this.props.musicActions.volumeControl({volume: 0});
			// 并且将音量进度条设置为 0
			this.setState({progress: 0});
		} else {
			// 判断当前播放的声音大小
			if (currentVolume && currentVolume !== null) {
				// 直接触发音量控制操作
				this.props.musicActions.volumeControl({volume: parseFloat(currentVolume)});
				// 更改当前音量进度条
				this.setState({progress: parseFloat(currentVolume) * 100 + '%'});
			} else {
				// 否则全部都默认操作
				this.setState({progress: 0.5 * 100 + '%'});
				this.props.musicActions.volumeControl({volume: 0.5});
			}
		}
	}

	// 歌手信息页面
    singerInfo(id) {
        this.props.history.push({pathname: '/singer/info', state: {singerId: id}});
    }

	// 音量进度条事件
	touchStartHandle(e){
		e.preventDefault();
		const touchObj1 = e.changedTouches[0];
		const x = touchObj1.clientX;
		const l = e.target.offsetLeft;
		const leftVal = x - l;
		this.setState({
			leftVal: leftVal,
			sliderWidth: this.refs.slider.offsetWidth,
			barWidth: e.target.offsetWidth,
		})		
	}
	touchMoveHandle(e){
		const {leftVal, sliderWidth, barWidth} = this.state;
		const touchObj2 = e.changedTouches[0];
		const thisX = touchObj2.clientX;
		let barLeft = thisX - leftVal;
		if (barLeft < 0) {
			barLeft = 0;
		} else if (barLeft > sliderWidth - barWidth) {
			barLeft = sliderWidth - barWidth
		}
		const currentValue = sliderWidth - barWidth > 0 ? (barLeft / ( sliderWidth - barWidth)).toFixed(2) : 0.5;
		if (currentValue >= 0 && currentValue <= 1) {
			parseFloat(currentValue) === 0 ? this.setState({volumed: false}) : this.setState({volumed: true});
			this.props.musicActions.volumeControl({volume: parseFloat(currentValue)});
			localStore.setItem('currentVolume', currentValue);
		} else {
			this.props.musicActions.volumeControl({volume: 0.5});
		}
		this.setState({progress: barLeft + 'px'});

	}

	// 播放上\下首
    playPrev() {
    	this.__play(1)

    }
    playNext() {
    	this.__play(-1)
    }

    // order 
    // 0 上一首
    // 1 下一首,默认下一首
    __play(order=1){
    	const hash = this.props.music.hash;
        const musicList = this.props.musicList;
        const listLen = musicList.length;
        let index = 0;
        let currentIndex;

        // 寻找出在列表中与当前播放的位置
        if (listLen > 0) {
            for (let i = 0; i < musicList.length; i++) {
                if (musicList[i].song.hash === hash) {
                    index = i;
                }
            }
        }

        // currentIndex = order ? ((index + 1) % listLen) : ((index + listLen - 1) % listLen);
        if (order == 1) {
	        currentIndex = index - 1 < 0 ? musicList.length - 1 : --index;
        }else{
        	currentIndex = index + 1 > musicList.length - 1 ? 0 : ++index;
        }

        const currentSong = musicList[currentIndex].song;
        this.props.musicActions.getMusicByHash({hash: currentSong.hash});
        this.props.history.replace('#' + currentSong.hash);
        this.props.musicActions.fetchMusic(currentSong.hash);
    }

    // 显示出播放列表层
	showMusicList(){
		this.setState({modal: true});
	}
	// 隐藏播放列表层
	// MusicList 组件传入的 changeShowModal 事件属性
	changeShowModal(e){
		this.setState({modal: e.modal});
	}

	// 关闭下弹出窗口
	closeDot(){
		this.setState({dot: false});
	}
	// 打开下弹出窗口
	openDot(){
		this.setState({dot: true});
	}

	addFavourite(filename){
		const currentEle = this.refs.favourite;
		if (currentEle.style.color === '') {
			this.props.musicActions.addFavorite(this.props.music.hash + ',' + filename);
		} else {
			currentEle.style.color = '';
			this.props.musicActions.removeFavorite(this.props.music.hash + ',' + filename);
		}
	}

	/*播放部分*/
	// 播放暂停
	playPause(e){
		// 将播放状态改变
		this.props.musicActions.playControl({
			playing: !this.props.control.playing
		});
	}
	
	/* InputRange onChange 事件 */
	onChange(val){
		// 当前值一但发生改变
		// 利用 InputRange 的 seekTo() 实例方法更新当播放的进度
		this.props.audio.player.seekTo(parseFloat(val/100));
	}

	render() {
		// console.log('Play render', this.props);
		// 首先要判断是否获取得到当前 song
		// 因为在网络在第一次渲染的时候可能没有那们快
		const current = getCurrentSong(this.props.music.hash, this.props.musicList);
		if (current) {

			// 当前歌曲
			const currentSong = current.song;
			// 当前歌曲歌词
			const currentSongLyrics = getCurrentSong(this.props.music.hash, this.props.musicList).lyrics;
			// console.log('currentSongLyrics', currentSongLyrics)
			// 当前歌曲的图片来源
			const albumImg = currentSong.imgUrl.replace(/\{size\}/g, 400);

			// 播放时间
			const currentTime = formatTime(this.props.progress.currentTime);
			const duration = formatTime(localStore.getItem('duration'));
			// 百分比
			const percentage = this.props.progress.percentage * 100;

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
										onClick={ () => this.openDot() }>
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
                                    <div className="originLyric"
                                    	style={{
                                    		transform: 'translateY(-' +
                                    			this.props.lyrics.index *
                                    				this.props.height + 'px)'
                                    	}}>
                                        {currentSongLyrics.map((ele, index) => (
                                            <p key={index} id={`line-${index}`}
                                            	style={{height: this.props.height + 'px'}}
                                               className={this.props.lyrics.time === ele[0] ?
                                               	'line on' : 'line'}>{ele[1]}
                                            </p>
                                        ))}
                                    </div>
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
					<MusicList 
						musicList={this.props.musicList} 
						show={this.state.modal} 
						hash={this.props.match.params.id}
                        changeShowModal={ (e) => this.changeShowModal(e) } 
                        {...this.props}/>

					<div className={`dot-modal ${this.state.dot ? 'translateY-0':''}`} >
						<h1>{currentSong.songName}</h1>
						<div className="move-btn">
							<div className="icon-btn">
								<i className="icon-favorite" 
									ref="favourite" 
									style={ this.favouriteStyle() } 
									onClick={() => {
										this.addFavourite(currentSong.fileName)
									}}></i>
							</div>
							<div className="icon-btn">
								<i className="icon-person" onClick={() => {
									this.singerInfo(currentSong.singerId)
								}} style={{fontSize: '22px'}}></i>
							</div>
						</div>
						<div className="volume">
							<div className="volume-icon"
								onClick={() => this.setVolume()}
								style={this.setSVG()}></div>
							<div className="volume-slider" ref="slider">
								<div className="volume-mask" style={{width: this.state.progress}}></div>
								<div className="volume-bar"
									style={{left: this.state.progress}}
									onTouchStart={ (e) => this.touchStartHandle(e) }
									onTouchMove={ (e) => this.touchMoveHandle(e) }>
								</div>
							</div>
						</div>
						<p className="cancel" onClick={ () => this.closeDot() }>取消</p>
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

// style 属性中不要使用箭头函数