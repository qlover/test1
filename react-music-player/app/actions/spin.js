import * as actionTypes from '../constants/index';
const spin_show = (data) => {
    return {
        type: actionTypes.SPIN_SHOW,
        data
    }
};
const spin_hide = (data) => {
    return {
        type: actionTypes.SPIN_HIDE,
        data
    }
};

export {spin_hide, spin_show};