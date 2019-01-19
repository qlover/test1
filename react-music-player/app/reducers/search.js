import * as actionTypes from '../constants/index';
// 存储热搜信息
const hotListReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SEARCH_HOT:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
// 
const searchResultListRecuer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SEARCH_RESULT:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
export {hotListReducer,searchResultListRecuer};