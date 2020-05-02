<template>
	<view class="content">
		<div class="title">输入{{ today }}事项</div>
		<input class="inp" maxlength="255" v-model="text" />
		<div class="btn_box">
			<div class="btn_line"><div class="make_sure_btn" @click="addTarget()">添加目标</div></div>
			<div class="btn_line"><div class="make_sure_btn">上传目标</div></div>
		</div>

		<ul class="tar_list">
			<li>序号</li>
			<li>目标</li>
			<li>操作</li>
		</ul>
		<ul class="tar_list" v-for="(item, index) in targetArr">
			<li>{{index + 1}}</li>
			<li>{{ item }}</li>
			<li><div class="del_btn" @click="delTarget(index)">删除</div></li>
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
	created() {
		let that = this;
		let day2 = new Date();
		day2.setTime(day2.getTime());
		let s2 = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate();
		console.log(s2);
		that.today = s2;
	},
	methods: {
		//添加目标
		addTarget() {
			const that = this;
			if (that.text === '' || that.text === null || that.text === undefined) {
				alert('输入目标不能为空');
			} else {
				that.targetArr.push(that.text);
				console.log(that.targetArr);
				that.text = '';
			}
		},

		//删除目标
		delTarget(index) {
			const that = this;
			that.targetArr.splice(index, 1);
			console.log(that.targetArr);
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
	.btn_line{
		display: inline-block;
		width:50%;
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
	width: 70rpx;
	margin: 0 auto;
	text-align: center;
	color: white;
	background-color: #ff3b30;
}
</style>