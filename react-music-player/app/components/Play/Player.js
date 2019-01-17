// 播放组件
import React, {Component} from 'react'
import ReactPlayer from 'react-player';
import * as localStore from '../../util/localStorage';

class Player extends Component {
    constructor(props) {
        super(props);

    }

    // 当前音乐播放设置当前音乐的 duration 时间
    onDuration(e) {
        localStorage.setItem('duration', e)
    }

    // 与 Play 组件方法一样
    // 获取当前播放的歌曲
    getCurrentSong() {
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
        return currentSong;
    }

    // 播放进度事件
    onProgress(state) {
        // console.log('Plaery onProgress >>', state)
        // 当音乐一开始播放就改变播放进度
        this.props.musicInfoActions.updateProgress({
            currentTime: state.playedSeconds,
            percentage: state.played
        });
    }

    onEnd(e) {
       

    }

    componentDidMount() {

    }

    render() {
        const currentSong = this.getCurrentSong();
        const url = currentSong ? currentSong.song.url : null;
        // const volume = this.props.volumeObj.volume;
        return (
            <div style={{display: 'none'}}>
                <ReactPlayer 
                    url={url} 
                    controls playing={this.props.control.playing} 
                    ref={player => {
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