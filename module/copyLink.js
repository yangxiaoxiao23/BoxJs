/*
 * 本模块功能复制链接
 * @author YHB
 * @email yangxiaoxiao23@gmail.com
 */
define(function(require, exports, module) {
	/*
	 * @oI {jQuery objects} 表示要复制的链接
	 */
	function copyLink(copyText) {
		if (window.clipboardData) {
			window.clipboardData.setData("Text", copyText)
		} else {
			var flashcopier = 'flashcopier';
			if (!document.getElementById(flashcopier)) {
				var divholder = document.createElement('div');
				divholder.id = flashcopier;
				document.body.appendChild(divholder);
			}
			document.getElementById(flashcopier).innerHTML = '';
			var divinfo = '<embed src="/tpl/www/js/copyflash/_clipboard.swf" FlashVars="clipboard='
					+ encodeURIComponent(copyText)
					+ '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
			document.getElementById(flashcopier).innerHTML = divinfo;
		}
	}
	exports.copyLink = copyLink;
});