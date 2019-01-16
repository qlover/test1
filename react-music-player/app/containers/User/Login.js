
// Login 组件的容器
// 主要就是将 redux 的状态当做属性传递给 Login 组件 
// bindActionCreators() https://www.jianshu.com/p/03368e3fdb02
import {bindActionCreators} from 'redux';

// import Login from '../../components/User/Login';
import {connect} from 'react-redux';
import * as userInfoActions from '../../actions/userInfo';
const mapStateToProps = (state) => {
	console.log('login mapStateToProps', state)
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

export default  connect(mapStateToProps, mapDispatchToProps)
(class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            userNameIsFocus: false,
            userPasswordIsFocus: false,
            error: false
        };
        this.userInfoHandle = this.userInfoHandle.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserPassWord = this.handleChangeUserPassWord.bind(this);
        this.handleFocusUserName = this.handleFocusUserName.bind(this);
        this.handleFocusUserPassWord = this.handleFocusUserPassWord.bind(this);
        this.handleBlurUserName = this.handleBlurUserName.bind(this);
        this.handleBlurUserPassWord = this.handleBlurUserPassWord.bind(this);
        this.clearUserNameValue = this.clearUserNameValue.bind(this);
        this.clearUserPassWordValue = this.clearUserPassWordValue.bind(this);
    }

    handleChangeUserName(e) {
        this.setState({userName: e.target.value});
    }

    handleChangeUserPassWord(e) {
        this.setState({userPassword: e.target.value});
    }

    userInfoHandle() {
        console.log('login.js userInfoHandle', this.props)
        if (this.state.userName !== '' || this.state.userPassword !== '') {
            // 地址跳转
            this.props.history.push({pathname: '/user/center'});
            // 属性传递
            // 通过 userInfoActions
            this.props.userInfoActions.update(this.state);
        } else {
            this.setState({error: true})
        }

    }

    handleFocusUserName() {
        this.setState({userNameIsFocus: true})
    }

    handleFocusUserPassWord() {
        this.setState({userPasswordIsFocus: true})
    }

    handleBlurUserName() {
        this.setState({userNameIsFocus: false})
    }

    handleBlurUserPassWord() {
        this.setState({userPasswordIsFocus: false})
    }

    clearUserNameValue() {
        this.setState({userName: ''});
    }

    clearUserPassWordValue() {
        this.setState({userPassword: ''});
    }

    render() {
        return (
            <div className="container-full container-flex">
                <Header title="登录"/>
                <div className="login">
                    <img src="/public/images/logo.png" style={{width: '100px', height: '100px',}} alt=""/>
                    <form action="/user/center" method="POST">
                        <p style={{borderColor: this.state.userNameIsFocus ? '#e9203d' : '#b8b8b8'}}>
                            <i className="icon-user3"></i>
                            <input type="text" placeholder="请输入用户名" onFocus={this.handleFocusUserName} onBlur={this.handleBlurUserName} onChange={this.handleChangeUserName}
                                   value={this.state.userName}/>
                            <em onClick={this.clearUserNameValue} style={{display:this.state.userName !=='' ? 'block' :'none'}}>&times;</em>
                        </p>
                        <p style={{borderColor: this.state.userPasswordIsFocus ? '#e9203d' : '#b8b8b8'}}>
                            <i className="icon-lock"></i>
                            <input type="password" placeholder="请输入密码" onFocus={this.handleFocusUserPassWord} onBlur={this.handleBlurUserPassWord}
                                   onChange={this.handleChangeUserPassWord}
                                   value={this.state.userPassword}/>
                            <em onClick={this.clearUserPassWordValue} style={{display:this.state.userPassword !=='' ? 'block' :'none'}}>&times;</em>
                        </p>
                        <p style={{border: 'none', marginBottom: '15px'}}>
                            <input type="button" className="input-button" value="登录" onClick={this.userInfoHandle}/>
                        </p>
                        <div className="error" style={{visibility: this.state.error ? 'visible' : 'hidden'}}>
                            请输入用户名和密码
                        </div>
                    </form>
                </div>
            </div>
        )
    }
});