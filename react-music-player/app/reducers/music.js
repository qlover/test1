import * as actionTypes from '../constants/index';
import {
    unique
} from '../util/tools';

// 当前播放的音乐
// 获得当前播放音乐的 hash 值到 redux 状态
const getMusicByHashReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_GET_HASH:
            return action.data;
        default:
            return state;
    }
};

// 歌曲收藏
const favoriteMusicReducer = (state = [], action) => {
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
const musicListReducer = (state = [], action) => {
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
const playControlReducer = (state = {
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
const updateProgressReducer = (state = {
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

// 音量
// 声音大小，默认 0.5
const volumeReducer = (state = {
    volume: 0.5
}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_VOLUME:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

// 歌词同步
const lyricsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_UPDATELYRICS:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export {
    getMusicByHashReducer,
    playControlReducer,
    updateProgressReducer,
    favoriteMusicReducer,
    musicListReducer,
    volumeReducer,
    lyricsUpdateReducer,
};