import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import Loading from '../../components/Common/Loading';
// 使用 babel-polyfill 编译 es7 语法
import 'babel-polyfill';

import request from '../../util/request';
import API from '../../util/API';

import SongPlayList from '../../containers/Home/SongPlayList';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            let response_new_song = await request.asyncGet(API.getNewSong());
            let data_new_song = await response_new_song.json();
            this.setState({
                banner: data_new_song.banner,
                new_song: data_new_song.data,
                loaded: true,
            })
        } catch (err) {
            //console.log("Error", err);
        }
        //console.log('Recommend.js >> fetchData state', this.state)
    }

    render(){
        const setting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
        };

       // {extra:
       //  tourl: "https://mtpls.kugou.com/topic/5c3daff6dea80b36ad12f72d.html?type=share"
       //  __proto__: Object
       //  id: 10299
       //  imgurl: "http://imge.kugou.com/mobilebanner/20190115/20190115230056189500.jpg"
       //  online: 1547564155
       //  title: "酷狗音乐故事第149期"
       //  type: 4
       //  }
        const carousel = this.state.loaded && this.state.banner.map((ele, index) => {
            return (
                <div key={index}>
                    <img src={ele.imgurl} alt={ele.title}/>
                </div>
            )
        });

        if (this.state.loaded) {
            return (
                <div className="content">
                    <div className="content-inner">
                        <Slider {...setting}>
                            {carousel}
                        </Slider>
                        <div className="title">
                            <span>推荐歌单</span>
                            <Link to="/album">
                                <i className="icon-keyboard_arrow_right"></i>
                            </Link>
                        </div>
                        <SongPlayList/>
                    </div>
                </div>
            )
        } else {
            return (
                <Loading/>
            )
        }
    }
}
