import {KUGOU} from '../config/api';
const api = KUGOU;
const API = {
	getAPI: () => api,
	getNewSong: ()  => `${api.new_song}`,
	getRecommendSong: () => `${api.recommend_song}`,
	getSearchHot: () => `${api.searchHot}?format=json`,
	getAlbumSongList: (id) => `${api.album_song_list}/${id}?json=true`,
	getRank: () => `${api.rank}`,
	getRankId: (id) => `${api.rankid}?rankid=${id}&page=1&json=true`,
	getSingerCategory: () => `${api.singer_category}`,
	getSingerList: (id) => `${api.singer_list}${id}?json=true`,
	getSingerHome: (id) => `${api.singer_home}${id}.html`,
	getSongDetail: (hash) => `${api.song_detail}?cmd=playInfo&hash=${hash}`,
	getSongLyrics: (hash, timeLength) => `${api.song_lyrics}?cmd=100&hash=${hash}&timelength=${timeLength}`,
	getSearchResult: (keyword, page, pagesize) => `${api.searchResult}?format=json&keyword=${keyword}&page=${page}&pagesize=${pagesize}`,
}


export default API;