import React from 'react';

import PlayerPage from './pages/player';

import ListPage from './pages/list';

import {
	HashRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import App from './App';

// 只为了定义路由
class Root extends React.Component {
	// 定义路由
	render() {
		return (
			<Router> 
				<App> 
					<Route path="/" ref="player" exact component={PlayerPage} />
					<Route path="/list" component={ListPage} /> 
				</App>
			</Router>

		);

	}

}

export default Root;