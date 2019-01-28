import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as musicActions from '../../actions/music';
import * as searchActions from '../../actions/search';
import ResultList from '../../components/List/ResultList';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActions: bindActionCreators(musicActions, dispatch),
        searchActions: bindActionCreators(searchActions, dispatch),

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultList);