// 过滤特殊字符
export function stripscript(str) {
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
	var rs = "";
	for (var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(pattern, '');
	}
	return rs;
}
// 验证用户名（邮箱）
export function validataUsername(value) {
	let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return !reg.test(value)?true:false
}
// 验证密码
export function validataPassword(value) {
	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	return !reg.test(value)?true:false
}
// 验证验证码
export function validataVcode(value) {
	let reg = /^[0-9A-Za-z]{6,20}$/;
	return !reg.test(value)?true:false
}