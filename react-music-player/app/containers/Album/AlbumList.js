import {connect} from 'react-redux';
import AlbumList from '../../components/Album/AlbumList';
import * as musicInfoAction from '../../actions/music';
import {bindActionCreators} from 'redux';
const mapStateToProps = (state) => {
	//console.log('album contaniners mapStateToProps>>', state)
    return {
    	totalAlbums: state.albums
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicInfoActions: bindActionCreators(musicInfoAction, dispatch)
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(AlbumList);
