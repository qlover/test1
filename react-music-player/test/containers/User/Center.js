import {connect} from 'react-redux';
// import Center from '../../components/User/Center';
// import * as musicInfoAction from '../../actions/music';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
	console.log('center mapStateToProps', state)
    return {
        userInfo: state.userInfo,
        favoriteMusic:state.favoriteMusic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        // musicInfoActions: bindActionCreators(musicInfoAction, dispatch)
    }
};

import React, {Component} from 'react';
export default connect(mapStateToProps, mapDispatchToProps)(
	class Center extends Component {
    render(){
        console.log('center', this.props.userInfo)
        return (
            <div>/user/center</div>
        )
    }
});