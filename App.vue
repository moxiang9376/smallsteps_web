<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		var ws = new WebSocket('ws://118.24.179.175:5000');
		ws.onopen = function(e) {
			ws.send('发送数据');
		};
		ws.onmessage = function (event){
			console.log(event.data)
		}
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import url('./static/css/reset.css');
</style>
