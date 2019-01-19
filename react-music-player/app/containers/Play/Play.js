import {connect} from 'react-redux';
import Play from '../../components/Play/Play';
import * as musicActions from '../../actions/music';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) =>{
	return {
		musicActions: bindActionCreators(musicActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);