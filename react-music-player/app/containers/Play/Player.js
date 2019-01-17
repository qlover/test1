import {connect} from 'react-redux';
import Player from '../../components/Play/Player';
import * as musicInfoAction from '../../actions/music';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
	//console.log('Player containers state=', state)
	return {
		musicList: state.musicList,
        music: state.music,
        control:state.control,
        progress:state.progress,
        audio:state.audio,
        lyricsUpdate:state.lyricsUpdate,
        spin:state.spin,
        volumeObj:state.volumeObj
	};
};

const mapDispatchToProps = (dispatch) =>{
	return {
		musicInfoActions: bindActionCreators(musicInfoAction, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);