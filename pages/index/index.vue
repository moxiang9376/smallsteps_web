<template>
	<view class="content">
		<div class="date_line">日期：{{ today }}</div>
		<div class="btn_box">
			<!-- <div class="btn back_blue">添加事项</div> -->
			<div class="btn back_green" @tap="goAddTarget()">添加目标</div>
		</div>
		<div class="title">今日目标</div>
		<!-- 		<ul class="tar_list">
					<li>序号</li>
					<li>目标</li>
					<li>操作</li>
				</ul> -->
		<ul class="tar_list" v-for="(item, index) in targetList">
			<li>{{ index + 1 }}</li>
			<li :style="{ 'text-decoration': item.success ? 'line-through' : '' }">{{ item.title }}</li>
			<li>
				<div :class="[item.success ? 'success_btn' : 'finish_btn']" @click="make_success(index)">{{ item.success == false ? '确认完成' : '已完成' }}</div>
			</li>
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			today: '',
			targetList: [],
			workList: []
		};
	},
	onShow() {
		const that = this;
		const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
		let data = {
			timestamp: timeStamp,
			userId: 1
		};
		uni.request({
			url: 'http://118.24.179.175:7001/getTodayTarget', //仅为示例，并非真实接口地址。
			method: 'post',
			data: data,
			success: function(res) {
				console.log(res.data);
				that.targetList = JSON.parse(res.data[0].target);
			}
		});
	},
	onLoad() {
		let that = this;
		let day2 = new Date();
		day2.setTime(day2.getTime());
		let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate();
		console.log(s2);
		that.today = s2;
	},
	methods: {
		//跳转添加目标页面
		goAddTarget() {
			uni.navigateTo({
				url: '../addTarget/addTarget',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		//确认完成
		make_success(index) {
			const that = this;
			that.targetList[index].success = true;
			const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
			let targetArr = JSON.stringify(that.targetList);
			console.log(targetArr);
			let data = {
				target: targetArr,
				timestamp: timeStamp,
				userId: 1
			};
			uni.request({
				url: 'http://118.24.179.175:7001/setTarget',
				method: 'POST',
				data: data,
				success: function(res) {
					if (res.data.title == 'success') {
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.date_line {
	text-align: center;
	margin: 20rpx 0;
}

.btn_box {
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn {
	width: 192rpx;
	height: 64rpx;
	line-height: 64rpx;
	text-align: center;
	color: white;
	font-size: 28rpx;
	border-radius: 12rpx;
	margin: 20rpx;
}

.back_blue {
	background-color: rgba(56, 125, 255, 1);
}

.back_green {
	background-color: #22dd92;
}

.title {
	font-size: 48rpx;
	text-align: center;
}
.tar_list {
	list-style: none;
	font-size: 28rpx;
	color: #333333;
	margin-bottom: 15rpx;
	li {
		display: inline-block;
		width: 33%;
		vertical-align: middle;
		text-align: center;
		word-break: break-all;
	}
}

.finish_btn {
	display: inline-block;
	padding: 5rpx 20rpx;
	font-size: 28rpx;
	color: white;
	background: rgba(56, 125, 255, 1);
	border-radius: 12rpx;
}

.success_btn {
	display: inline-block;
	padding: 5rpx 20rpx;
	font-size: 28rpx;
	color: #3cc457;
	border-radius: 12rpx;
}
</style>
