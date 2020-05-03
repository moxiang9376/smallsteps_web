//uchart饼状图添加数据
// arr = [{
// 	name: 'string',
// 	color: 'string',
// 	data: number ,
// 	}];
function uchartPieSetArr(arr) {
	let pieArr = {
		series: []
	};
	arr.forEach((item, index) => {
		pieArr.series.push({
			color: item.color,
			data: item.data,
			index: 0,
			legendShape: 'circle',
			name: item.name,
			pointShape: 'circle',
			show: true,
			type: 'pie'
		});
	});
	return pieArr;
}

//随机颜色
function randomColor() {

}

//获取用户信息
function getUserInfo() {
	let userInfo = sessionStorage.getItem("userInfo")
	userInfo = JSON.parse(userInfo)
	return userInfo
}


//非空校验
function emptyCheck(data,success,error) {
	if (data === "" || data === null || data == undefined) {
		error()
	} else {
		next()
	}
}

export default {
	uchartPieSetArr,
	getUserInfo,
	emptyCheck
}
