import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../Common/SearchBar';
import classNames from 'classnames';

export default class extends Component {
    onFocus(e) {
        this.props.history.push({pathname:'/search'})
    }

    render() {
        return (
            <div className="header">
                <div className="cityName">
                    <Link to="/user/login">
                        <i className="icon-user-circle-o"></i>
                    </Link>
                </div>
                <SearchBar onFocus={ (e) => this.onFocus(e)} />
                <div className="music-icon">
                    <Link to={this.props.music.hash && 
                        this.props.music.hash && 
                        this.props.control.playing !== 'null' ? 
                            `/play/#${this.props.music.hash}` :
                            '/play/#null'} >
                        <div className="music-icon-animate ">{
                            ['one', 'two', 'three', 'four'].map((ele, i) => {
                                return (
                                    <span key={i} 
                                        className={classNames(ele, this.props.music.hash &&
                                            this.props.music.hash !== 'null' &&
                                            this.props.control.playing ?
                                                'playing' : 'paused')}></span>
                                )
                            })
                        }</div>
                    </Link>
                </div>
            </div>
        )
    }
}