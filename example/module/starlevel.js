/*
 * 本模块功能是评分模块,采用seajs作为模块管理.
 * @author YHB
 * @email yangxiaoxiao23@gmail.com
 */
define(function(require, exports, module){
	
	var level = 0;
	/*
	 * @oI {jQuery objects} 星星的元素的载体
	 * @oText {jQuery objects} 提示文本元素的
	 * @tipsText {Array} 根据选择的星星个数,动态改变的文本
	 * @selectedstyle {String} 选中星星的背景图片坐标
	 * @unselectedstyle {String} 未选中星星的背景图片坐标
	 */
	function starLevel(oI, oText,tipsText, selectedstyle, unselectedstyle, fn){
		level = oI.length;
		oText.attr('value', level);
		
		oI.hover(function(ev){
			var pos = $(this).index();
			level = pos;
			oI.each(function(index){
				if(index < pos){
					$(this).css('backgroundPosition', selectedstyle);
				} else {
					$(this).css('backgroundPosition', unselectedstyle);
				}
			});
			oText.text(tipsText[pos-1]).attr('value', level);
			fn && fn(level);
		});
		
	}
	exports.starLevel = starLevel;
});