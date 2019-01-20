import React from 'react';
export default class extends React.Component {
	render(){
		return (<div className="searchBar">
	        <div className="searchInput">
	            <i className="icon-search"></i>
	            <input type="text" 
	                className="input input-search" 
	                onFocus={this.props.onFocus} 
	                placeholder="请输入关键字"/>
	        </div>
	    </div>)
	}
}