import * as actionTypes from '../constants/index';
import API from '../util/API';
import request from '../util/request';
import {spin_show} from './spin';

// 存储热搜信息
const saveSearchHot = (data) => {
    return {
        type: actionTypes.SAVE_SEARCH_HOT,
        data
    }
};

const saveSearchResult = (data) => {
    return {
        type: actionTypes.SAVE_SEARCH_RESULT,
        data
    }
};

// 请求热搜信息
const fetchSearchHot = () => {
    return async dispatch => {
        try {
            let result = await request.asyncGet(API.getSearchHot());
            let resultData = await result.json();
            
            // 默认将热搜信息存储
            dispatch(saveSearchHot(resultData));

        } catch (err) {
            console.error("Error", err);
        }
    }
};
const fetchSearchResult = (keyword, page = 1, pagesize = 20) => {
    return async dispatch => {
        try {
            let result = await request.asyncGet(API.getSearchResult(keyword, page, pagesize));
            let resultData = await result.json();
            dispatch(saveSearchResult(resultData));
        } catch (err) {
            console.error("Error", err);
        }
    }
};

export {fetchSearchHot, fetchSearchResult};
