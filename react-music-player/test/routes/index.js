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

const Routes = () => (
    <div className="app">
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/search" exact component={Search}/>
                <Route path="/search/result" component={Result}/>
                <Route path="/user/login" component={Login}/>
                <Route path="/user/center" component={Center}/>
            </Switch>
        </Router>
    </div>
);
export default Routes;