
// Login 组件的容器
// 主要就是将 redux 的状态当做属性传递给 Login 组件 
// bindActionCreators() https://www.jianshu.com/p/03368e3fdb02
import {bindActionCreators} from 'redux';
import Login from '../../components/User/Login';
import {connect} from 'react-redux';
import * as userInfoActions from '../../actions/userInfo';
const mapStateToProps = (state) => {
	//console.log('login mapStateToProps', state)
    return {
        userInfo: state.userInfo
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        userInfoActions: bindActionCreators(userInfoActions, dispatch)
    }
};

import React, {Component} from  'react';
import Header from '../../components/Common/Header';

export default  connect(mapStateToProps, mapDispatchToProps)(Login);