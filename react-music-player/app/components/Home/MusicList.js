// 音乐播放列表
import React, {Component} from 'react';
export default class extends Component {
	constructor(props) {
		super(props);

	}

	// 关闭播放列表层
	close() {
		// 该属性是从 playe 页面传入的
		this.props.changeShowModal({modal: false})
	}

	// 播放音乐
	playThisMusic(e) {
		// 1. 获取音乐
		this.props.musicActions.getMusicByHash({hash: e.song.hash});
		// 2. 替换地址为当前歌曲的 hash
		this.props.history.replace('#' + e.song.hash);
		// 3. 请求音乐
		this.props.musicActions.fetchMusic(e.song.hash);
		// 4. 关闭当前播放列表层
		this.close();
	}

	clearMusicById(hash, i) {
		const list = this.props.musicList;
		let index;
		if (hash === this.props.music.hash) {
			if (list.length > 1) {
				index = i === list.length - 1 ? 0 : i + 1;
				this.props.musicActions.removeMusic(hash);
				const reg = new RegExp(window.location.href.split('#')[1]);
				const url = window.location.href.replace(reg, list[index].song.hash);
				window.location.replace(url);
				this.props.musicActions.getMusicByHash({hash: list[index].song.hash});
			} else {
				this.props.musicActions.removeMusic(hash);
				this.props.musicActions.getMusicByHash({hash: ''});
				window.history.back();
			}
		} else {
			this.props.musicActions.removeMusic(hash);
		}    
	}

	clearMusicAll() {
		// console.log('clearMusicAll', this.props)
		this.props.musicActions.removeMusicAll();
		this.props.musicActions.getMusicByHash({hash: ''});
		window.history.back();
	}

	render() {
		const musicList = this.props.musicList;
		const lists = musicList.length > 0 && musicList.map((ele, index) => {
			return (
				<li key={index}>
					<span className={
						this.props.music.hash === ele.song.hash ?
							 'active' : ''}
						onClick={ e => this.playThisMusic(ele) } >{ele.song.fileName}
					</span>
					<i onClick={() => this.clearMusicById(ele.song.hash, index)}>&times;</i>
				</li>
			)
		});
		return (
			<div className={`modal-music-list ${this.props.show ?
					'translateY-0' : ''}`}>
				<div className="list-title">
					<i className="icon-close" 
						onClick={ () => this.close() }></i>
					<span>播放列表（{musicList.length}）首</span>
					<em onClick={ () => this.clearMusicAll() }>清除</em>
				</div>
				<ul className="list-ul">
					{lists}
				</ul>
			</div>
		)
	}
}