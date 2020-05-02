<template>
	<view>
		<div>过去一个月数据统计</div>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas
				canvas-id="canvasPie"
				id="canvasPie"
				class="charts"
				:width="cWidth * pixelRatio"
				:height="cHeight * pixelRatio"
				:style="{ width: cWidth + 'px', height: cHeight + 'px' }"
				@touchstart="touchPie"
			></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
import uCharts from '../../components/u-charts.js';
// import  { isJSON } from '@/common/checker.js';
var _self;
var canvaPie = null;

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			successTarget:0,
			allTarget:0
		};
	},
	onLoad() {
		_self = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		this.getServerData();
	},
	methods: {
		getServerData() {
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
					
					
					let Pie = { series: [] };
					Pie.series.push({
						color:"#1890ff",
						data:that.successTarget,
						index:0,
						legendShape:"circle",
						name:"已完成",
						pointShape:"circle",
						show:true,
						type:"pie"
					})
					
					Pie.series.push({
						color:"#2fc25b",
						data:that.allTarget-that.successTarget,
						index:0,
						legendShape:"circle",
						name:"未完成",
						pointShape:"circle",
						show:true,
						type:"pie"
					})
					_self.showPie("canvasPie",Pie);
				}
			});
		},
		
		showPie(canvasId, chartData) {
			canvaPie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						border: true,
						borderColor: '#FFFFFF',
						borderWidth: 3
					}
				}
			});
		},
		touchPie(e) {
			canvaPie.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
			canvaPie.touchLegend(e, { animation: true });
		}
	}
};
</script>

<style lang="scss">
/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
