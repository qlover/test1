import {connect} from 'react-redux';
import Player from '../../components/Play/Player';
import * as musicActions from '../../actions/music';
import * as playActions from '../../actions/play';
import * as spinActions from '../../actions/spin';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
	// console.log('Player containers state=', state)
	return {
		musicList: state.musicList,
        music: state.music,
        control: state.control,
        progress: state.progress,
        audio: state.audio,
        lyrics: state.lyrics,
        spin: state.spin,
        volumeReducer: state.volumeReducer,
        IANANAME: 'qlover' 
	};
};

const mapDispatchToProps = (dispatch) =>{
	return {
		musicActions: bindActionCreators(musicActions, dispatch),
		playActions: bindActionCreators(playActions, dispatch),
		spinActions: bindActionCreators(spinActions, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
