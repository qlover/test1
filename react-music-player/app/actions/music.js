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


export {updateMusic, addFavorite, removeFavorite};
