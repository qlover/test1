import * as actionTypes from '../constants/index';

// 总歌单操作
const albumsReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ALBUMS_GET:
            return action.data;
            break;
        default:
            return state
    }
};

export{
	albumsReducer,
}