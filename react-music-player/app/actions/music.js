import * as actionTypes from '../constants/index';
import API from '../util/API';
import request from '../util/request';
// import {spin_show} from './spin';
// import {parseLyric} from '../util/tools';
// 获取歌单
const updateMusic = (data) => {
    return {
        type: actionTypes.MUSIC_UPDATE,
        data
    }
};

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
const getMusic = (data) => {
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

// 请求获取音乐信息
const fetchMusic = (id) => {
    return async dispatch => {
        // dispatch(spin_show());
        try {
            // 歌曲详细信息
            let res_song = await request.asyncGet(`/kugou/${API.song_detail}?cmd=playInfo&hash=${id}`);
            let res_song_detail = await res_song.json();
            // 歌曲歌词
            let res_lyrics = await request.asyncGet(`/kugou/${API.song_lyrics}?cmd=100&hash=${id}&timelength=${res_song_detail.timeLength}`);
            let res_lyrics_detail = await res_lyrics.text();
            // let musicObj = {song: res_song_detail, lyrics: parseLyric(res_lyrics_detail)};
            let musicObj = {
                song: res_song_detail
            };

            // 直接 dispatch
            // 分发 添加 音乐
            dispatch(addMusic(musicObj));
        } catch (err) {
            console.log("Error", err);
        }
    }
};

// 音乐控制
const control = (playing) => {
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

export {
    updateMusic,
    addFavorite,
    removeFavorite,
    getMusic,
    fetchMusic,
    control,
    updateProgress
};