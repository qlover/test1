import {connect} from 'react-redux';
import Album from '../../components/Album/Album';
import * as musicActions from '../../actions/music';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
	//console.log('album contaniners mapStateToProps>>', state)
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActions: bindActionCreators(musicActions, dispatch)
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Album);
