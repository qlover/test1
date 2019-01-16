import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';


import Home from '../containers/Home/Index';
import Search from '../containers/Search/Search';
import Result from '../containers/Search/Result';
import Login from '../containers/User/Login';
import Center from '../containers/User/Center';
import New from '../containers/New/New';
import Rank from '../containers/Rank/Rank';
import RankList from '../containers/Rank/RankList';
import Artist from '../containers/Artist/Artist';
import ArtistList from '../containers/Artist/ArtistList';
import ArtistListSinger from '../containers/Artist/ArtistListSinger';
import Album from '../containers/Album/Album';
// 精选歌单
import AlbumList from '../containers/Album/AlbumList';


const Routes = () => (
    <div className="app">
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/search" exact component={Search}/>
                <Route path="/search/result" component={Result}/>
                <Route path="/user/login" component={Login}/>
                <Route path="/user/center" component={Center}/>
                // 如果要用 URL 地址参数获取后面的值,要加 :
                <Route path="/album/:id"  component={Album}/>
                <Route path="/album" exact component={AlbumList}/>
                <Route path="/new" exact component={New}/>
                // 加上 exact 为了与其它带有该路由的分开
                <Route path="/rank" exact component={Rank}/>
                <Route path="/rank/list/:id" component={RankList}/>
                <Route path="/artist" exact component={Artist}/>
                <Route path="/artist/list/:id" exact component={ArtistList}/>
                <Route path="/artist/list/singer/:id" exact component={ArtistListSinger}/>

            </Switch>
        </Router>
    </div>
);
export default Routes;