import React, {Component} from 'react';
import Header from '../Common/Header';
import {Link} from 'react-router-dom';
import girlImg from '../../static/images/girl.jpg';

export default class extends Component {
    render(){
        return (
            <div className="container">
                <Header title="个人中心"/>
                <div className="user-inner">
                    <div className="userBox">
                        <img src={girlImg} />
                        <div className="userInfo">
                            <p>当前用户：{this.props.userInfo.userName}</p>
                        </div>
                    </div>
                    <ul className="list-block">
                        <li>
                            <span>我的收藏列表</span>
                            <Link to={'/user/favorite'}>
                                <i className="icon-keyboard_arrow_right"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}