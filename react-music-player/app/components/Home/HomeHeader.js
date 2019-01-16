import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

export default class extends Component {
    onFocus(e) {
        this.props.history.push({pathname:'/search'})
    }

    render() {
        return (
            <div className="header">
                <div className="cityName">
                    <Link to="/user/login"><i className="icon-user-circle-o"></i></Link>
                </div>
                <div className="searchBar">
                    <div className="searchInput">
                        <i className="icon-search"></i>
                        <input type="text" className="input input-search" onFocus={ (e) => this.onFocus(e) } placeholder="请输入关键字"/>
                    </div>
                </div>
                <div className="music-icon">
                    MI
                </div>
            </div>
        )
    }
}