import userInfo from './userInfo';
import {albums, music, favoriteMusic} from './music';
import {combineReducers} from 'redux';
import {rankList} from './rank';

// 注册各种类型的 reducer
export default combineReducers({
    userInfo,
    albums,
    rankList,
    music,
    favoriteMusic,
})
