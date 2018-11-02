// 得到随机数 [min, max]
export function rand(min, max) {
	return Math.round(Math.random() * (max - min) + min);
};

// 格式化时间
export function formatTime(time) {
	time = Math.floor(time);
	let miniute = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
};

// 得到一个元素在某个元素中的索引
export function getIndexFromItems(item, items){
	let index = items.indexOf(item);
	return Math.max(0, index);
}
