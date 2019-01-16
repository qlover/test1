import {connect} from 'react-redux';
import Artist from '../../components/Artist/Artist';
import * as musicInfoActions from '../../actions/music';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
    	musicInfoActions: bindActionCreators(musicInfoActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);