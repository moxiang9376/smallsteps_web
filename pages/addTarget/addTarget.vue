<template>
	<view class="content">
		<div class="title">输入{{ today }}目标</div>
		<input class="inp" maxlength="255" v-model="text" />
		<div class="btn_box">
			<div class="btn_line"><div class="make_sure_btn" @click="addTarget()">添加目标</div></div>
			<div class="btn_line"><div class="make_sure_btn" @click="uploadTarget()">上传目标</div></div>
		</div>

		<ul class="tar_list">
			<li>序号</li>
			<li>目标</li>
			<li>操作</li>
		</ul>
		<ul class="tar_list" v-for="(item, index) in targetArr">
			<li>{{ index + 1 }}</li>
			<li>{{ item.title }}</li>
			<li>
				<div class="del_btn" @click="delTarget(index)">删除</div>
				<!-- <div class="success_btn" v-if="item.success">已完成</div> -->
			</li>
			
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			text: '',
			targetArr: [],
			today: ''
		};
	},
	onLoad() {},
	onShow() {
		let that = this;
		let day2 = new Date();
		day2.setTime(day2.getTime());
		let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate();
		console.log(s2);
		that.today = s2;

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
				that.targetArr = JSON.parse(res.data[0].target);
			}
		});
	},
	
	onHide(){
		const that = this
		that.uploadTarget()
	},
	methods: {
		//添加目标
		addTarget() {
			const that = this;
			if (that.text === '' || that.text === null || that.text === undefined) {
				alert('输入目标不能为空');
			} else {
				if (that.targetArr.length <= 4) {
					that.targetArr.push({ title: that.text, success: false });
					console.log(that.targetArr);
				} else {
					alert('目标在精不在多，集中精力在目前的目标上吧！');
				}

				that.text = '';
			}
		},

		//删除目标
		delTarget(index) {
			const that = this;
			that.targetArr.splice(index, 1);
			console.log(that.targetArr);
		},
		//上传目标
		uploadTarget() {
			const that = this;
			const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
			let targetArr = JSON.stringify(that.targetArr);
			console.log(targetArr);
			let params = {
				target: targetArr,
				timestamp: timeStamp,
				userId: 1
			};
			uni.request({
				url: 'http://118.24.179.175:7001/setTarget', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: params,
				success: function(res) {
					if(res.data.title == "success"){
						alert("目标设定成功！")
					}
				}
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
.inp {
	margin-bottom: 15rpx;
	font-size: 28rpx;
	height: 60rpx;
	border: 1px solid #c8c7cc;
}

.btn_box {
	width: 100%;
	.btn_line {
		display: inline-block;
		width: 50%;
		text-align: center;
	}
}

.make_sure_btn {
	display: inline-block;
	width: 192rpx;
	height: 64rpx;
	line-height: 64rpx;
	text-align: center;
	color: white;
	font-size: 28rpx;
	background: rgba(56, 125, 255, 1);
	border-radius: 12rpx;
	&:hover {
		background-color: green;
	}
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

.del_btn {
	color: white;
	background-color: #ff3b30;
	display: inline-block;
	padding: 5rpx 20rpx;
	font-size: 28rpx;
	border-radius: 12rpx;
}

.success_btn {
	display: inline-block;
	padding: 5rpx 20rpx;
	font-size: 28rpx;
	color: #3CC457;
	border-radius: 12rpx;
}
</style>
