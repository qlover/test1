import * as actionTypes from '../constants/index';
const update = (data) => {
	console.log('userInfoActions.update', data)
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
};

const get = (data) => {
	
};

const get = (data) => {
	
};


export {update, get, set};