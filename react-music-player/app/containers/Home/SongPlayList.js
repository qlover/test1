import {connect} from 'react-redux';
import SongPlayList from '../../components/Home/SongPlayList';
import {bindActionCreators} from 'redux';
import * as albumActions from '../../actions/album';

const mapStateToProps = (state) => {
    return {
        totalAlbums: state.albums
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        albumActions: bindActionCreators(albumActions, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SongPlayList);
