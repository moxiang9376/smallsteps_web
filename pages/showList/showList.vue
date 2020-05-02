<template>
	<view class="showList">
		<div>在过去的一个月里面</div>
		<div>设定了{{ allTarget }}个目标</div>
		<div>完成了{{ successTarget }}个目标</div>
		<div>完成率为{{ comRate }}%</div>
		<div>加油，为了更好的自己</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			allTarget: 0,
			successTarget: 0,
			comRate: 0
		};
	},

	onReady() {
		const that = this;
		const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
		const startTime = timeStamp - 86400 * 30;
		const params = {
			startTime: startTime,
			endTime: timeStamp,
			userId: 1
		};
		uni.request({
			url: 'http://118.24.179.175:7001/timeTarget', //仅为示例，并非真实接口地址。
			method: 'POST',
			data: params,
			success: function(res) {
				console.log(res.data);
				let targetList = [];
				res.data.forEach((item, index) => {
					targetList = targetList.concat(JSON.parse(item.target));
				});
				targetList.forEach((item, index) => {
					if (item.success == true) {
						that.successTarget++;
					}
				});
				that.allTarget = targetList.length;
				that.comRate = parseInt((that.successTarget / that.allTarget) * 100);
			}
		});
	},
	methods: {
		//假数据插入
		test() {
			let timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
			// 一天是86400秒   故 7 天前的时间戳为
			timeStamp = timeStamp - 86400 * 4;
			let targetArr = [{ title: '321', success: false }, { title: '123', success: true }];
			targetArr = JSON.stringify(targetArr);
			let params = {
				target: targetArr,
				timestamp: timeStamp,
				userId: 2
			};
			uni.request({
				url: 'http://118.24.179.175:7001/setTarget', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: params,
				success: function(res) {
					if (res.data.title == 'success') {
						alert('目标设定成功！');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.showList{
		div{
			margin:20rpx;
			font-size: 36rpx;
		}
	}
	
</style>
