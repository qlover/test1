import {connect} from 'react-redux';
import Center from '../../components/User/Center';
// import * as musicAction from '../../actions/music';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
	//console.log('center mapStateToProps', state)
    return {
        userInfo: state.userInfo,
        // 收藏列表
        favoriteMusic: state.favoriteMusic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        // musicActions: bindActionCreators(musicAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);