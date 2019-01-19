import {connect} from 'react-redux';
import RankList from '../../components/Rank/RankList';
import * as musicInfoAction from '../../actions/music';
import * as rankActions from '../../actions/music';

import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicInfoActions: bindActionCreators(musicInfoAction, dispatch),
        rankActions: bindActionCreators(rankActions, dispatch)
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(RankList);
