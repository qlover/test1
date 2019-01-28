import {connect} from 'react-redux';
import ArtistList from '../../components/Artist/ArtistList';
import * as musicInfoActions from '../../actions/music';
import * as artistActions from '../../actions/artist';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
    	musicInfoActions: bindActionCreators(musicInfoActions, dispatch),
		artistActions: bindActionCreators(artistActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
