import React, {Component} from 'react';
import API from '../../util/API';
import request from '../../util/request';
import {Link} from 'react-router-dom';
import Header from '../Common/Header';
import Nav from '../Home/Nav';
import Loading from '../Common/Loading';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        request.asyncGet(`/kugou/${API.singer_category}`).then(res => res.json()).then(resData => {
            this.setState({
                loaded: true,
                artist: resData.list,
            });
            //console.log('Artist >> this.state.artist', this.state.artist);
        }).catch(err => {
            console.log('Error:' + err);
        })
    }

    render() {
        return (
            <div className="container">
                <Header title="歌手"/>
                <Nav {...this.props}/>
                {this.state.loaded ?
                    <ul className="artistList">
                        {
                            this.state.artist.map( (ele, ind) => {
                                return(
                                    <li key={ele.classid}>
                                        <Link to={`/artist/list/${ele.classid}`}>
                                            <span>{ele.classname}</span>
                                            <i className="icon-keyboard_arrow_right"></i>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>:
                    <Loading />
                }
            </div>
        )
    }
}
