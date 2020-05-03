<template>
	<view class="login">
		<div class="middle_box">
			<p class="middle_title">登录页面</p>
			<div class="middle_input_line">
				<p>账号</p>
				<input v-model="userName" type="text" />
			</div>
			<div class="middle_input_line">
				<p>密码</p>
				<input v-model="password" type="password" />
			</div>
			<div class="login_btn" @click="login()">登录</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userName: '',
			password: ''
		};
	},

	methods: {
		login() {
			const that = this;
			const params = {
				name: that.userName,
				pwd: that.password
			};

			if(params.name === ""){
				alert("请输入账户")
				return
			}
			if(params.pwd === ""){
				alert("请输入密码")
				return
			}
	
				
			

			uni.request({
				method: 'post',
				url: 'http://118.24.179.175:7001/login',
				data: params,
				success: function(res) {
					console.log(res);
					if (res.data === 'error') {
						alert('账号密码错误，请重新输入');
					} else {
						let userInfo = {
							id: res.data.id,
							name: res.data.name
						};
						sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
						let hello = that.common.getUserInfo()
						console.log(hello)
						uni.switchTab({
							url: '../index/index',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
}
.middle_box {
	height: 100upx;
	margin: 0 auto;
	margin-top: 30%;
	text-align: center;
}

.middle_title {
	font-size: 48upx;
	color: #333333;
}

.middle_input_line {
	p {
		display: inline-block;
		vertical-align: middle;
		margin-right: 10upx;
		color: #333333;
	}
	input {
		display: inline-block;
		vertical-align: middle;
		border: 1upx solid #ccc;
		text-align: left;
		padding: 0 10upx;
	}
	margin: 10upx auto;
	font-size: 36upx;
}

.login_btn {
	margin-top: 20upx;
	color: white;
	background-color: #3cc457;
	display: inline-block;
	padding: 10upx 40upx;
	font-size: 48upx;
	border-radius: 12upx;
}
</style>
