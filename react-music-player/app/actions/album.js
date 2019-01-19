import * as actionTypes from '../constants/index';

// 获取精选歌单
const getAlbums = (data) => {
    return {
        type: actionTypes.MUSIC_UPDATE,
        data
    }
};

export{
	getAlbums,
}