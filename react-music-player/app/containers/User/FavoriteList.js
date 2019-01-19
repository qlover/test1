import {connect} from 'react-redux';
import FavoriteList from '../../components/User/FavoriteList';
import * as musicActions from '../../actions/music';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
	//console.log('FavoriteList mapStateToProps', state)
    return {
        userInfo: state.userInfo,
        favoriteMusic: state.favoriteMusic
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActions: bindActionCreators(musicActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList);