import React, {
	Component
} from 'react';
import Header from '../Common/Header';
import request from '../../util/request';
import API from '../../util/API';
import {
	Link
} from 'react-router-dom';
import Loading from '../Common/Loading';

// 使用 babel-polyfill 编译 es7 语法
import 'babel-polyfill';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
		this.playAll = this.playAll.bind(this);

	}

	componentDidMount() {
		this.fetchData();
	}


	playAll() {

	}

	async fetchData() {
		const url = `/kugou/${API.song_playlist}/${this.props.match.params.id}?json=true`;
		request.get(url)
			.then(res => {
				this.setState({
					albumInfo: res.info,
					albumList: res.list,
					loaded: true
				});
				console.log('album >> this.state', this.state)
			})
			.catch(e => {
				console.error(e)
			})
	}

	addFavorite(ele) {
		const currentEle = this.refs[ele.hash];
		if (currentEle.style.color === '') {
			currentEle.style.color = 'rgb(233, 32, 61)';
			this.props.musicInfoActions.addFavorite(ele.hash + ',' + ele.filename);
		} else {
			currentEle.style.color = '';
			this.props.musicInfoActions.removeFavorite(ele.hash + ',' + ele.filename);
		}
	}

	setStyle(hash) {
		return this.props.favoriteMusic.length > 0 &&
			this.props.favoriteMusic.toString().indexOf(hash) >= 0 ?
				{ color: 'rgb(233, 32, 61)' } : { color: '' };
	}

	render() {
		console.log('album >> this.props', this.props)
		return (
			<div className="container">
				<Header title="歌单"/>{
					this.state.loaded ?
					<div className="album-top">
						<div className="album-bg" style={{backgroundImage: `url(${this.state.albumInfo.list.imgurl.replace(/\{size\}/g, 400)})`}}></div>
						<div className="album-info">
							<img className="album-img" src={this.state.albumInfo.list.imgurl.replace(/\{size\}/g, 400)}/>
							<div className="album-text">
								<p>名称：{this.state.albumInfo.list.specialname}</p>
								<p>创建人：{this.state.albumInfo.list.nickname}</p>
								<p>更新时间：{this.state.albumInfo.list.publishtime.split(/\s/)[0]}</p>
							</div>
						</div>
						<div className="play_all"><span>播放全部</span> <i onClick={this.playAll} className="icon-playlist_add"></i></div>
						<div className="album-list">
							<ul>{
								this.state.albumList.list.info.map( (ele, ind) => {
									return(
										<li key={ind}>
											<Link to={`/play/#${ele.hash}`}>
												<span>{ele.filename}</span>
												<p className="album-remark">{ele.remark}</p>
											</Link>
											<i 
												className="icon-favorite"
												style={ this.setStyle(ele.hash) }
												ref={ele.hash}
												onClick={ () => this.addFavorite(ele) }
												></i>
										</li>
									);
								})
							}</ul>
						</div>
					</div> :
					<Loading/>}
			</div>
		)
	}
}