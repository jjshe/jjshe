module.exports = {

	expFun : function(flag) {

		if(flag === 0){
			throw '我是例外';
		}
		return 'success';
	}
}