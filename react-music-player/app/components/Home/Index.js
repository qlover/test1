import React, {Component} from 'react';
import HomeHeader from './HomeHeader';
import Nav from './Nav';
import Recommend from './Recommend';

export default class extends Component {
    componentDidMount() {
        // 请求热搜信息
        this.props.searchActions.fetchSearchHot();
    }

    render() {
        return (
            <div className="container">
                <HomeHeader {...this.props} />
                <Nav {...this.props}/>
                <Recommend/>
            </div>
        )
    }
}