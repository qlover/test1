import React, {Component} from 'react';
import * as localStore from '../../util/localStorage';
import Header from '../Common/Header';
import Loading from '../Common/Loading';
import {Link} from 'react-router-dom';

import ResultList from '../../containers/List/ResultList';

export default class extends Component {
	constructor(props){
		super(props);
		this.state = {
            searchValue : localStore.getItem('search_value').split(',')[0]
		}
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
        // console.log('Result result', result)
        return (
            <div className="container">
                <Header title={this.state.searchValue} 
                	rightIcon="icon-playlist_add" 
                	rightIconStyle={{fontSize: '24px'}} 
                	rightAction={ () => this.playAll() }/>
				<ResultList searchValue={this.state.searchValue}/>
            </div>
        )
    }
}