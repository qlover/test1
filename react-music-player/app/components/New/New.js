import React, {Component} from 'react';
import API from '../../util/API';
import request from '../../util/request';
import {Link} from 'react-router-dom';
import Header from '../Common/Header';
import Nav from '../Home/Nav';
import Loading from '../Common/Loading';

export default class extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        // console.log('New >> this.props', this.props);

        request.asyncGet(API.getNewSong())
            .then(res => res.json())
            .then(resData => {
                this.setState({
                    loaded: true,
                    newsong: resData.data
                });
                //console.log('New >> this.state.newsong', this.state.newsong)
            })
            .catch(err => {
                console.log('Error:' + err);
            })
    }
    // 增加喜欢
    addFavorite(ele){
        // 利用 hash 选择 对应的 ref 元素
        const currentEle = this.refs[ele.hash];
        if (currentEle.style.color === '') {
            currentEle.style.color = 'rgb(233, 32, 61)';
            this.props.musicInfoActions.addFavorite(ele.hash + ',' + ele.filename);
        } else {
            currentEle.style.color = '';
            this.props.musicInfoActions.removeFavorite(ele.hash + ',' + ele.filename);
        }
        console.log('New', this.props)
    }

    setStyle(hash) {
        return this.props.favoriteMusic.length > 0 && this.props.favoriteMusic.toString().indexOf(hash) >= 0 ? {color: 'rgb(233, 32, 61)'} : {color: ''};
    }

    render() {
        return (
            <div className="container">
                <Header title="新歌"/>
                <Nav {...this.props}/>
                {
                    this.state.loaded ?
                    <ul className="songList">{
                        this.state.newsong.map( (ele, ind) => {
                            return(
                                <li key={ind} >
                                    <Link to={`/play/#${ele.hash}`}>
                                        <span className={this.props.music.hash === ele.hash ?
                                            'active' : ''}>{ele.filename}
                                        </span>
                                    </Link>
                                    <i 
                                        className="icon-favorite" 
                                        style={this.setStyle(ele.hash)} 
                                        ref={ele.hash} 
                                        onClick={() => this.addFavorite(ele)}></i>
                                </li>
                            )
                        })
                    }</ul> :
                    <Loading />
                }
            </div>
        )
    }
}
