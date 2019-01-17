import * as actionTypes from '../constants/index';
import {
    unique
} from '../util/tools';
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
        case actionTypes.MUSIC_ADD_FAVORITE:
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


// 播放列表
const musicList = (state = [], action) => {
    switch (action.type) {
        // actions/music/addMusic()
        case actionTypes.MUSIC_ADD:
            let arr = [...state, action.data];
            let hash = {};
            // 去除数组里的重复对象
            let newArr = arr.reduce((item, next) => {
                hash[next.song.hash] ? '' : hash[next.song.hash] = true && item.push(next);
                return item
            }, []);
            return newArr;
            break;
            // actions/music/removeMusic()
        case actionTypes.MUSIC_REMOVE:
            return state.filter((item) => {
                if (item.song.hash !== action.data) {
                    return item
                }
            });
            break;
            // actions/music/removeAllMusic()
        case actionTypes.MUSIC_REMOVE_ALL:
            return state = [];
            break;
        default:
            return state;
    }
};

// 播放控制
// 默认未播放状态
const control = (state = {
    playing: false
}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_CONTROL:
            // 将状态 state 和 播放状态 playing 合并成一个全新对象返回
            return Object.assign({}, state, action.playing);
        default:
            return state;
    }
};

// 播放进度
// 默认当前时间为0
// 默认百分比为 0
const progress = (state = {
    currentTime: 0,
    percentage: 0
}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_PLAYTIME:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export {
    albums,
    music,
    favoriteMusic,
    musicList,
    control,
    progress
};