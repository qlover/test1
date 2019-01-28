import React, {
  Component
} from 'react';
import * as localStore from '../../util/localStorage';
import Loading from '../Common/Loading';
import {
  Link
} from 'react-router-dom';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedOnce: false,
      fetchLow: 1,
      fetchHigh: 30
    }
  }

  componentWillMount() {
    // console.log('ResultList componentWilldMount', this.props)
    this.__fetchSearchResult()
  }

  __fetchSearchResult(){
    this.props.searchActions
      .fetchSearchResult(this.props.searchValue, this.state.fetchLow, this.state.fetchHigh)
      .then(() => {
        this.setState({
          loadedOnce: true,
          fetchLow: this.state.fetchHigh,
          fetchHigh: this.state.fetchHigh + 30
        });
        console.log('ResultList fetch success', this.props.resultList)
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
    return this.props.favoriteMusic.length > 0 &&
      this.props.favoriteMusic.toString().indexOf(hash) >= 0 ? {
        color: 'rgb(233, 32, 61)'
      } : {
        color: ''
      };
  }

  render() {
    console.log('resultList >> this.state.loadedOnce', this.state.loadedOnce);

    return (
      <ul className="songList">
        {
          this.state.loadedOnce && JSON.stringify(this.props.resultList) !== '{}'?
            this.props.resultList.data.info.map((ele, index) => {
              return (
                <li key={index}>
                  <Link to={'/play/#' + ele.hash.toUpperCase()}>
                    <span className={this.props.music.hash === ele.hash ? 'active' : ''}>
                      {ele.filename}
                    </span>
                  </Link>
                  <i className="icon-favorite" 
                    style={this.setStyle(ele.hash)} 
                    ref={ele.hash} 
                    onClick={() => this.addFavorite(ele)}>
                  </i>
                </li>
              )
          }) : <Loading />
        }
      </ul>
    );
  }
}