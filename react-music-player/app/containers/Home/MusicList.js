import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as musicActions from '../../actions/music';
import MusicList from '../../components/Home/MusicList';

const mapStateToProps = (state) => {
    return {
        musicList: state.musicList,
        music: state.music,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicActions: bindActionCreators(musicActions, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);