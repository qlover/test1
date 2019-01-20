
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import nav from '../../config/nav';

export default class Nav extends Component {
    render() {
        return (
            <ul className="nav">
                {
                    nav.map((item, i) => (
                        <li className={this.props.location.pathname === item.path ? 'active' : ''} key={i}><Link to={`${item.path}`}>{item.text}</Link></li>))
                }
            </ul>
        )
    }
};