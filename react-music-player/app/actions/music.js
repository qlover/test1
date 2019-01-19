import * as actionTypes from '../constants/index';
import API from '../util/API';
import request from '../util/request';
// import {spin_show} from './spin';
// 歌词解析
import {parseLyric} from '../util/tools';

// 添加到收藏列表
const addFavorite = (data) => {
    return {
        type: actionTypes.MUSIC_ADD_FAVORITE,
        data
    }
};
// 移除收藏列表
const removeFavorite = (data) => {
    return {
        type: actionTypes.MUSIC_REMOVE_FAVORITE,
        data
    }
};

// 获取音乐hash
const getMusicByHash = (data) => {
    return {
        type: actionTypes.MUSIC_GET_HASH,
        data
    }
};

// 向当前播放列表添加音乐
const addMusic = (data) => {
    return {
        type: actionTypes.MUSIC_ADD,
        data
    }
};
// 移除播放列表歌曲
const removeMusic = (data) => {
    return {
        type: actionTypes.MUSIC_REMOVE,
        data
    }
};

// 移除播放列表所有歌曲
const removeMusicAll = () => {
    return {
        type: actionTypes.MUSIC_REMOVE_ALL
    }
};


// 请求获取音乐信息
// defaultDispatch 是否默认自动添加音乐到当前播放列表
const fetchMusic = (hash, defaultDispatch = true) => {
    return async dispatch => {
        // dispatch(spin_show());
        try {
            // 歌曲详细信息
            let res_song = await request.asyncGet(`/kugou/${API.song_detail}?cmd=playInfo&hash=${hash}`);
            let res_song_detail = await res_song.json();
            // 歌曲歌词
            let res_lyrics = await request.asyncGet(`/kugou/${API.song_lyrics}?cmd=100&hash=${hash}&timelength=${res_song_detail.timeLength}`);
            let res_lyrics_detail = await res_lyrics.text();

            // 请求的数据带上歌曲和该歌曲歌词信息
            let musicObj = {
                song: res_song_detail, 
                lyrics: parseLyric(res_lyrics_detail)
            };
            
            // 直接 dispatch
            // 分发 添加 音乐
            if (defaultDispatch) {
                dispatch(addMusic(musicObj));
            } else {
                return [musicObj, dispatch]
            }
        } catch (err) {
            console.log("Error", err);
        }
    }
};

// 播放控制
const playControl = (playing) => {
    return {
        type: actionTypes.MUSIC_CONTROL,
        playing
    }
};

// 更新播放进度
const updateProgress = (data) => {
    return {
        type: actionTypes.MUSIC_PLAYTIME,
        data
    }
};

// 音量控制
const volumeControl = (data) => {
    return {
        type: actionTypes.MUSIC_VOLUME,
        data
    }
};

// 歌词同步
const updateLyrics = (data) => {
    return {
        type: actionTypes.MUSIC_UPDATELYRICS,
        data
    }
};

export {
    addFavorite,
    removeFavorite,
    getMusicByHash,
    fetchMusic,
    playControl,
    updateProgress,
    volumeControl,
    updateLyrics,
    addMusic,
    removeMusic,
    removeMusicAll,
};