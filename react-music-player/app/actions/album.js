import * as actionTypes from '../constants/index';

// 获取精选歌单
const getAlbums = (data) => {
    return {
        type: actionTypes.ALBUMS_GET,
        data
    }
};

export{
	getAlbums,
}