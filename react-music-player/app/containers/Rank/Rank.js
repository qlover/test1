import {connect} from 'react-redux';
import Rank from '../../components/Rank/Rank';
import * as rankActions from '../../actions/rank';

// import * as musicInfoAction from '../../actions/music';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
		rankActions: bindActionCreators(rankActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rank);