

npm i babel-core babel-loader@7.1.5 babel-preset-env babel-preset-react webpaack webpack-cli -D

npm i react react-dom --sava

npm i install html-webpack-plugin clean-webpack-plugin -S

npm install react-hot-loader -S


npm install --save-dev express webpack-dev-middleware

npm install -S css-lodaer less style-lodaer less-loader



$().jPlayer("option", key, value)

可以设置也可以获取一个音乐播放的参数


$().jPlayer("setMedia", {
	swfPath: "../../dist/jplayer", // jquery.jplayer.swf 文件存放的位置
	supplied: "oga,m4a",  // 播放的文件类型
	wmode: "window", // 设置Flash 的wmode，具体设置参见文档说明，写window 就好了
	useStateClassSkin: true, // 默认情况下，播放和静音状态下的dom 元素会添加class jp-state-playing, jp-state-muted 这些状态会对应一些皮肤，是否使用这些状态对应的皮肤。
	autoBlur: false, // 点击之后自动失去焦点
	smoothPlayBar: true, // 平滑过渡
	keyEnabled: true, // 是否允许键盘控制播放
	remainingDuration: true, // 是否显示剩余播放时间,如果为false 那么duration 那个dom显示的是【3:07】,如果为true 显示的为【-3:07】
	toggleDuration: true //允许点击剩余时间的dom 时切换 剩余播放时间的方式，比如从【3:07】点击变成【-3：07】如果设置为false ,那么点击无效，只能显示remainingDuration 设置的方式。
	

})




react-router 


V4 版本中的 <Router></Router> 已经被 HashRouteer 和 BowserRouter 替代

IndexRouter 组件已被去除， 被 Route exact 属性代替



## pubsub 管理事件消息

App 组件管理了整个 Player 组件的播放
则组件间事件处理选用发布订阅的 pubsub

发送消息：PubSub.publish(name, args)
订阅消息：PubSub.subscribe(name, function)
取消订阅：PubSub.unsubscrib(name)

### 消息内容

播放下一首 PLAY_NEXT
播放上一首 PLAY_PREV


将几个组件需要用的 currentMusicItem 属性都寄放在 PubSub 下
因为 cloneElement() 方法目前还没得解析
就是有了路由父子组件之间的属性状态传递还没有被解决
