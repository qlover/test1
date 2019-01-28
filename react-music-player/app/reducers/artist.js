import * as actionTypes from '../constants/index';
import {
    unique
} from '../util/tools';

// 歌手信息
const singerInfoReducer = (state = {}, action) => {
    // console.log('singerInfoReducer', state, action)
    switch (action.type) {
        case actionTypes.SINGERINFO_SET:
            // console.log('singerInfoReducer set', arr)
            return action.data;
            break;
        default:
            return state
    }
};



export{
	singerInfoReducer,
}