import React, {Component} from 'react';
import * as localStore from '../../util/localStorage';
import Header from '../Common/Header';
import Loading from '../Common/Loading';
import {Link} from 'react-router-dom';


export default class extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

    componentDidMount() {
        this.props.searchActions
        	.fetchSearchResult(this.props.location.state.searchValue)
        	.then(() => {
        		console.log('加载完成')
        		this.setState({ loaded: true})
        	});
    }

    addFavorite(ele) {
        const currentEle = this.refs[ele.hash];
        if (currentEle.style.color === '') {
            currentEle.style.color = 'rgb(233, 32, 61)';
            this.props.musicActions.addFavorite(ele.hash + ',' + ele.filename);
        } else {
            currentEle.style.color = '';
            this.props.musicActions.removeFavorite(ele.hash + ',' + ele.filename);
        }
    }

    setStyle(hash) {
        return this.props.favoriteMusic.length > 0 && this.props.favoriteMusic.toString().indexOf(hash) >= 0 ? {color: 'rgb(233, 32, 61)'} : {color: ''};
    }

    playAll() {
        const singerSongs = this.props.resultList.data.info;
        for (let i = 0; i < singerSongs.length; i++) {
            this.props.musicActions.fetchMusic(singerSongs[i].hash.toUpperCase());
        }
        this.props.musicActions.getMusicByHash({hash: singerSongs[0].hash.toUpperCase()});
        this.props.musicActions.playControl({playing: true});
        this.props.history.push(`/play/#${singerSongs[0].hash.toUpperCase()}`);
    }

    render() {
        let result;
        if (JSON.stringify(this.props.resultList) !== '{}') {
            result = this.props.resultList.data.info.map((ele, index) => {
                return (
                    <li key={index}>
                        {/*fuck,真变态，酷狗云音乐API有坑*/}
                        <Link to={'/play/#' + ele.hash.toUpperCase()}>
                            <span className={this.props.music.hash === ele.hash ? 
                            	'active' : ''}>{ele.filename}
                            </span>
                        </Link>
                        <i className="icon-favorite" 
                        	style={this.setStyle(ele.hash)} 
                        	ref={ele.hash} 
                        	onClick={() => this.addFavorite(ele)}>
                        </i>
                    </li>
                )
            });
        }
        // console.log('Result result', result)
        return (
            <div className="container">
                <Header title={this.props.location.state.searchValue} 
                	rightIcon="icon-playlist_add" 
                	rightIconStyle={{fontSize: '24px'}} 
                	rightAction={ () => this.playAll() }/>
                	{
                		
                			this.state.loaded && JSON.stringify(this.props.resultList) !== '{}'?
                				<ul className="songList">{result}</ul> :
                					<Loading />
		        	}	

            </div>
        	
        )
    }
}