import * as actionTypes from '../constants/index';

const playReducer = (state = {}, action) => {
    switch (action.type) {
    	// 放置一个 ReactPlayer 组件
        case actionTypes.MUSIC_AUDIO:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export {playReducer};