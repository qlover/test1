import {connect} from 'react-redux';
import Search from '../../components/Search/Search';
import * as musicActions from '../../actions/music';
import * as searchActions from '../../actions/search';
import * as spinActions from '../../actions/spin';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActions: bindActionCreators(musicActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch),
        spinActions: bindActionCreators(spinActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);