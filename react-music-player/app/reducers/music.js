import * as actionTypes from '../constants/index';
import {unique} from '../util/tools';
// 总歌单操作
const albums = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_UPDATE:
            return action.data;
            break;
        default:
            return state
    }
};

// 当前播放的音乐
const music = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_GET_HASH:
            return action.data;
        default:
            return state;
    }
};

// 歌曲收藏
const favoriteMusic = (state = [], action) => {
    switch (action.type) {
    	// 添加
        case  actionTypes.MUSIC_ADD_FAVORITE:
            let arr = [...state, action.data];
            return unique(arr);
        // 删除
        case actionTypes.MUSIC_REMOVE_FAVORITE:
            const index = state.indexOf(action.data);
            state.splice(index, 1);
            return state;
        default:
            return state;
    }
};

export {albums, music, favoriteMusic};
