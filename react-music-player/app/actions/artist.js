import * as actionTypes from '../constants/index';

// 设置歌手信息
const setSingerInfo = (data) => {
    return {
        type: actionTypes.SINGERINFO_SET,
        data
    }
};
const getSingerInfo = (data) => {
    return {
        type: actionTypes.SINGERINFO_GET,
        data
    }
};
export{
	setSingerInfo,
	getSingerInfo,
}