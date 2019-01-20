// 获取当前播放的歌曲
const getCurrentSong = function (hash, musicList){
	let currentSong = null;
	if (musicList.length > 0 && hash) {
		musicList.map((ele) => {
			if (ele.song.hash === hash) {
				currentSong = ele;
			}
		})
	}
	return currentSong;
}


export {
	getCurrentSong
};