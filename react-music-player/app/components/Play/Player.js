// 播放组件
import React, {Component} from 'react'
import ReactPlayer from 'react-player';
import * as localStore from '../../util/localStorage';
import {getCurrentSong} from '../../util/Music';

class Player extends Component {
	constructor(props) {
		super(props);

	}

	// 当前音乐播放设置当前音乐的 duration 时间
	onDuration(e) {
		localStorage.setItem('duration', e)
	}

	// 播放进度事件
	// 并且要与歌词对应
	onProgress(state) {
		// console.log('Plaery onProgress >>', state)
		// 当音乐一开始播放就改变播放进度
		this.props.musicActions.updateProgress({
			currentTime: state.playedSeconds,
			percentage: state.played
		});

		// 获取当前歌曲
		const currentLyrics = getCurrentSong(this.props.music.hash, this.props.musicList).lyrics;
        for (let i = 0, l = currentLyrics.length; i < l; i++) {
            if (state.playedSeconds > currentLyrics[i][0]) {
                //显示到页面
                // lyricContainer.textContent = that.lyric[i][1];
                this.props.musicActions.updateLyrics({
                	updateLyrics: currentLyrics[i][1], 
                	time: currentLyrics[i][0], 
                	index: i
                });
            }
        }

	}

	onEnd(e) {
        // 播放完毕播放下一首
        const musicList = this.props.musicList;
        const hash = this.props.music.hash;
        if (musicList.length > 1) {
            let index = 0;
            for (let i = 0; i < musicList.length; i++) {
                if (musicList[i].song.hash === hash) {
                    index = i;
                }
            }
            let currentIndex = index + 1 > musicList.length - 1 ? 0 : ++index;
            const currentSong = musicList[currentIndex].song;
            this.props.musicActions.getMusicByHash({hash: currentSong.hash});
            if (window.location.pathname === '/play/') {
                const reg = new RegExp(window.location.href.split('#')[1]);
                const url = window.location.href.replace(reg, currentSong.hash);
                window.location.replace(url);
            }
            this.props.musicActions.fetchMusic(currentSong.hash);
        } else {
            this.props.musicActions.playControl({playing: false});
        }	   
	}

	componentDidMount() {
		// 页面渲染完成，将 ReactPlayer 组件实例当传递给 redux 状态
		// 用 ref 属性取得 ReactPlayer 组件实例
		this.props.playActions.setPlayer({player: this.player});
	}

	render() {
		// console.log('Player this.props', this.props)
		const currentSong = getCurrentSong(this.props.music.hash, this.props.musicList);
		const url = currentSong ? currentSong.song.url : null;
		const volume = this.props.volumeReducer.volume;
		return (
			<div style={{display: 'none'}}>
				<ReactPlayer
					volume={volume}
					url={url}
					controls playing={this.props.control.playing} 
					ref={ player => {
						this.player = player
					}} 
					onProgress={ (e) => this.onProgress(e)} 
					onDuration={ (e) => this.onDuration(e)} 
					onEnded={ (e) => this.onEnd(e) }/>
			</div>
		)
	}
}

export default Player;
