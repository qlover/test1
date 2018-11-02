import React from 'react';

import Logo from './components/logo';

import {
	rand,
	getIndexFromItems
} from './utils/utils';

import MUSIC_LIST from './config/config';

import PubSub from 'pubsub-js';

// 整个项目管理页面
class App extends React.Component {

	constructor(props) {
		super(props);


		this.state = {
			musicList: MUSIC_LIST,
			currentMusicItem: {},
			// 播放方式
			// 1 顺序
			// 2 随机
			// 0 单曲循环
			repeatType: 1
		}
	}

	componentDidMount() {
		// 初始，当
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});

		// 初始页面开始播放
		this.playMusic(this.state.musicList[0]);

		// 监听音乐播放完成事件
		$("#player").bind($.jPlayer.event.ended, (e) => {
			let state = this.state.repeatType;
			// 顺序播放
			if (state) {
				this.playNext();
			}
			// 随机播放
			else if (state == 2) {
				let index = this.rand(0, this.state.musicItem.length);
				this.playeMusic(this.state.musicList[index]);
			}
			// 单曲循环
			else {
				this.playeMusic(PubSub.currentMusicItem);
			}

		});

		/**
		 * 监听消息订阅内容
		 */
		// 播放下一首消息
		PubSub.subscribe("PLAY_NEXT", () => {
			this.playNext(1);
		});
		// 播放上一首消息
		PubSub.subscribe("PLAY_PREV", () => {
			this.playNext(0);
		});

	}

	// 当组件要卸载时，取消消息订阅
	componentWillUnmount() {
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
		PubSub.unsubscribe('CHANGE_ITEM');
	}

	// 不仅要改变自己状态，也要改变子组件状态
	changeCurrentMusicItem(item){
		PubSub.publish('CHANGE_ITEM', item);
		PubSub.currentMusicItem = item
	}

	// 
	/**
	 * 播放下一首可以是上一首也可以是下一首	
	 * @param  {Number} type 0 上一首 
	 *                       1 下一首
	 */
	playNext(type = 1) {
		let index = getIndexFromItems(PubSub.currentMusicItem, this.state.musicList);
		let listLen = this.state.musicList.length;
		let musicItem = {};
		index = type ? ((index + 1) % listLen) : ((index + listLen - 1) % listLen);
		musicItem = this.state.musicList[index]
		// 改变状态
		this.changeCurrentMusicItem(musicItem);
		// 播放
		this.playMusic(musicItem);
	}

	// 播放音乐，并改变当前播放的状态
	playMusic(item) {
		// 改变状态
		this.changeCurrentMusicItem(item);
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');

	}

	render() {
		
		const childrenWithProps = React.Children.map(this.props.children,
		          (child) => React.cloneElement(child, this.state));

		return (
			<div className="container">
				<Logo></Logo>
				{childrenWithProps}
			</div>

		);
	}


}

export default App;