// Loading 的显示与加载
import * as actionTypes from '../constants/index';
const spinReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.SPIN_HIDE:
            return false;
        case actionTypes.SPIN_SHOW:
            return true;
        default:
            return state;
    }
};
export {spinReducer};