import {connect} from 'react-redux';
import Result from '../../components/Search/Result';
import * as musicActions from '../../actions/music';
import * as searchActions from '../../actions/search';
import * as spinActions from '../../actions/spin';

import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActionss: bindActionCreators(musicActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch),
        spinActions: bindActionCreators(spinActions, dispatch)

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);