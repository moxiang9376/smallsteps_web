<template>
	<view class="content">
		<div class="date_line">日期：{{ today }}</div>
		<div class="btn_box">
			<!-- <div class="btn back_blue">添加事项</div> -->
			<div class="btn back_green" @tap="goAddTarget()">添加目标</div>
		</div>
	</view>
</template>

<script>

export default {

	data() {
		return {
			today: ''
		};
	},
	onLoad() {},
	created() {
		let that = this;
		let day2 = new Date();
		day2.setTime(day2.getTime());
		let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate();
		console.log(s2);
		that.today = s2;
	},
	created(){
		const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
		console.log(timeStamp)
		let hello = {
			name:123,
			target:"123123目标",
			timestamp:timeStamp,
			userId:1
		}
		
	
		uni.request({
		    url: 'http://118.24.179.175:7001/setTarget', //仅为示例，并非真实接口地址。
			method:"POST",
				data:hello,
		    success: function (res) {
		        console.log(res.data);
		    }
		});
	
		uni.request({
		    url: 'http://118.24.179.175:7001/test', //仅为示例，并非真实接口地址。
			method:"GET",
		    success: function (res) {
		        console.log(res.data);
		    }
		});
		// uni.request({
		//     url: 'http://118.24.179.175:7001/find', //仅为示例，并非真实接口地址。
		// 	method:"post",
		//     success: function (res) {
		//         console.log(res.data);
		//     }
		// });
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
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	margin-bottom: 15rpx;
	font-size: 28rpx;
}

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
</style>
