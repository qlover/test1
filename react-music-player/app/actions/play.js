import * as actionTypes from '../constants/index';

// 放置一个 player 对象
const setPlayer = (data) => {
	return {
		type: actionTypes.MUSIC_AUDIO,
		data
	}
};


export {setPlayer};