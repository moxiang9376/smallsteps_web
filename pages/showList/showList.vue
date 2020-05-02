<template>
	<view>
<!-- 		<div>今天要做的事</div>
		<ul class="tar_list">
			<li>序号</li>
			<li>事项</li>
			<li>操作</li>
		</ul>
		<ul class="tar_list" v-for="(item, index) in workList">
			<li>{{ index + 1 }}</li>
			<li>{{ item }}</li>
			<li><div class="finish_btn">确认完成</div></li>
		</ul> -->
		<div>今日目标</div>
		<ul class="tar_list">
			<li>序号</li>
			<li>目标</li>
			<li>操作</li>
		</ul>
		<ul class="tar_list" v-for="(item, index) in targetList">
			<li>{{ index + 1 }}</li>
			<li>{{ item }}</li>
			<li><div class="finish_btn">确认完成</div></li>
		</ul>
	</view>
</template>

<script>
export default {
	data() {
		return {
			targetList: [1, 2, 3],
			workList: [3, 2, 1]
		};
	}
};
</script>

<style lang="scss" scoped>
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
</style>
