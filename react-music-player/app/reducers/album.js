import * as actionTypes from '../constants/index';

// 总歌单操作
const albumsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.MUSIC_UPDATE:
            return action.data;
            break;
        default:
            return state
    }
};

export{
	albumsReducer,
}