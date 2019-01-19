import userInfo from './userInfo';
import {
	getMusicByHashReducer,
	playControlReducer,
	updateProgressReducer,
	favoriteMusicReducer,
	musicListReducer,
	volumeReducer,
	lyricsUpdateReducer
} from './music';
import {
	combineReducers
} from 'redux';
import {
	rankList
} from './rank';
import {
	albumsReducer
} from './album';

import {
	hotListReducer,
	searchResultListRecuer
} from './search';

import {
	spinReducer
} from './spin';
import {
	playReducer
} from './play';

// 注册各种类型的 reducer
// 也就是注册各种属性，
export default combineReducers({
	// 用户信息
	userInfo,
	// 精选音乐
	albums: albumsReducer,
	// 当前音乐
	music: getMusicByHashReducer,
	// 播放控制
	control: playControlReducer,
	// 进度
	progress: updateProgressReducer,
	// 当前播放列表
	musicList: musicListReducer,
	// ReactPlayer 组件实例对象属性
	audio: playReducer,
	// 收藏列表
	favoriteMusic: favoriteMusicReducer,
	// 声音对象
	volumeReducer,
	// 收藏列表
	favoriteMusicList: favoriteMusicReducer,
	// 歌曲对象
	lyrics: lyricsUpdateReducer,
	// 排行列表
	rankList,
	// 搜索
	hotList: hotListReducer,
	// 搜索结果
	resultList: searchResultListRecuer,
	// Loading 是否显示
	spin: spinReducer,
});