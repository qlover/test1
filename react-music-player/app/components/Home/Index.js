import React, {Component} from 'react';
import HomeHeader from './HomeHeader';
import Nav from './Nav';
import Recommend from './Recommend';

export default class extends Component {
    componentDidMount() {
        // this.props.searchActions.fetchSearchHot();
        console.log('search', this.props)
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