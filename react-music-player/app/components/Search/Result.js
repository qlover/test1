import React, {Component} from 'react';

export default class extends Component {

	render(){
		return(<div>
			Search Result!!!{this.props.location.state.searchValue}
		</div>)
	}
}