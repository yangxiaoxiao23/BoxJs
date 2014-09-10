/*
 * 本模块功能是文件上传功能,采用seajs作为模块管理.
 * 该模块对外暴露,上传文件对象,可以通过该对象调用swfupload提供的接口
 * @author YHB
 * @email yangxiaoxiao23@gmail.com
 */
define(function(require, exports, module){
	var swfUp;
	
	function fileUpload(params) {
		
		var uploadUrl = params['uploadUrl'] , //上传图片的请求地址
			flashUrl = params['flashUrl'], //flash文件所在的地址
			filePostName = params['filePostName']
			
			postParams = params['postParams'], //一个对象直接量，里面的键/值对会随着每一个文件一起上传，文件上传要附加一些信息
			useQueryString = params['useQueryString'],//为false时,post_params属性定义的参数会以post方式上传；为true时，则会以get方式上传
			fileTypes = params['fileTypes'],//指定了允许上传的文件类型，多个类型时使用分号隔开，比如：*.jpg;*.png ,允许所有类型时请使用 *.*
			fileSizeLimit	=	params['fileSizeLimit'],//上传的文件的最大体积，可以带单位，合法的单位有:B、KB、MB、GB，默认为KB。该属性为0时，表示不限制文件的大小。
			fileUploadLimit	=	params['fileUploadLimit'],//指定最多能上传多少个文件，当上传成功的文件数量达到了这个最大值后，就不能再上传文件了，也不能往上传队列里添加文件了。把该属性设为0时表示不限制文件的上传数量。
 			fileQueueLimit	=	params['fileQueueLimit'],//指定文件上传队列里最多能同时存放多少个文件。当超过了这个数目后只有当队列里有文件上传成功、上传出错或被取消上传后，等同数量的其他文件才可以被添加进来。当file_upload_limit的数值或者剩余的能上传的文件数量小于file_queue_limit时，则取那个更小的值
			
			buttonPlaceholderId = params['buttonPlaceholderId'], //指定一个dom元素的id,该dom元素在swfupload实例化后会被Flash按钮代替，这个dom元素相当于一个占位符
			buttonImageUrl = params['buttonImageUrl'],//指定Flash按钮的背景图片，相对地址或绝对地址都可以。该地址会受到preserve_relative_urls属性的影响，遵从与upload_url一样的规则。该背景图片必须是一个sprite图片,从上到下包含了Flash按钮的正常、鼠标悬停、按下、禁用这四种状态。因此该图片的高度应该是Flash按钮高度的四倍
			buttonWidth = params['buttonWidth'],//指定Flash按钮的宽度
			buttonHeight = params['buttonHeight'],//指定Flash按钮的高度，应该为button_image_url所指定的按钮背景图片高度的1/4
			buttonText = params['buttonText'], //指定Flash按钮上的文字，也可以是html代码
			buttonTextStyle = params['buttonTextStyle'], //Flash按钮上的文字的样式，使用方法见示例
			buttonTextLeftPadding = params['buttonTextLeftPadding'], //指定Flash按钮顶部的内边距，可使用负值
			buttonTextTopPadding = params['buttonTextTopPadding']; //指定Flash按钮左边的内边距，可使用负值
			
		var fileDialogStartHandler = params['fileDialogStartHandler'], //在文件选取窗口将要弹出时触发
			fileQueuedHandler = params['fileQueuedHandler'], //当一个文件被添加到上传队列时会触发此事件，提供的唯一参数为包含该文件信息的file object对象
			fileQueueErrorHandler = params['fileQueueErrorHandler'], //当文件添加到上传队列失败时触发此事件，失败的原因可能是文件大小超过了你允许的数值、文件是空的或者文件队列已经满员了等。该事件提供了三个参数。第一个参数是当前出现问题的文件对象，第二个参数是具体的错误代码，可以参照SWFUpload.QUEUE_ERROR中定义的常量
			fileDialogCompleteHandler = params['fileDialogCompleteHandler'], /*当文件选取完毕且选取的文件经过处理后（指添加到上传队列），会立即触发该事件。可以在该事件中调用this.startUpload()方法来实现文件的自动上传
参数number of files selected指本次在文件选取框里选取的文件数量
参数number of files queued指本次被添加到上传队列的文件数量
参数total number of files in the queued指当前上传队列里共有多少个文件（包括了本次添加进去的文件）*/

			uploadStartHandler = params['uploadStartHandler'], //当文件即将上传时会触发该事件,该事件给了你在文件上传前的最后一次机会来验证文件信息、增加要随之上传的附加信息或做其他工作。可以通过返回false来取消本次文件的上传;参数file object为当前要上传的文件的信息对象
			uploadProgressHandler = params['uploadProgressHandler'], //该事件会在文件的上传过程中反复触发，可以利用该事件来实现上传进度条;参数file object为文件信息对象;参数bytes complete为当前已上传的字节数;参数total bytes为文件总的字节数
			uploadErrorHandler = params['uploadErrorHandler'], //文件上传被中断或是文件没有成功上传时会触发该事件。停止、取消文件上传或是在uploadStart事件中返回false都会引发这个事件，但是如果某个文件被取消了但仍然还在队列中则不会触发该事件;参数file object为文件信息对象;参数error code为错误代码，具体的可参照SWFUpload.UPLOAD_ERROR中定义的常量
			uploadSuccessHandler = params['uploadSuccessHandler'], //当一个文件上传成功后会触发该事件;参数file object为文件信息对象;参数server data为服务器端输出的数据
			uploadCompleteHandler = params['uploadCompleteHandler']; //当一次文件上传的流程完成时（不管是成功的还是不成功的）会触发该事件，该事件表明本次上传已经完成，上传队列里的下一个文件可以开始上传了。该事件发生后队列中下一个文件的上传将会开始
			
		if(fileUploadLimit === undefined){
			fileUploadLimit = 10;
		}
		
		if(fileQueueLimit === undefined){
			fileQueueLimit = 10;
		}
		
		var settings_object = {
			upload_url: uploadUrl,
			flash_url: flashUrl,
			file_post_name : filePostName || "Filedata",
			post_params : postParams,
			use_query_string : useQueryString,
			requeue_on_error : false,
			http_success : [201, 202],
			assume_success_timeout : 0,
			file_types : fileTypes || '*.jpg;*.png',
			file_types_description: "Web Image Files",
			file_size_limit : fileSizeLimit || 1024,
			file_upload_limit : fileUploadLimit,
			file_queue_limit : fileQueueLimit,				
			debug : false,
			prevent_swf_caching : false,
			preserve_relative_urls : false,
			
			button_placeholder_id : buttonPlaceholderId || "element_id",
			button_image_url : buttonImageUrl || "http://www.swfupload.org/button_sprite.png",
			button_width : buttonWidth || 61,
			button_height : buttonHeight || 22,
			button_text : buttonText || '<b>Click</b> <span class="redText">here</span>',
			button_text_style : buttonTextStyle || ".redText {background:#ccc;}",
			button_text_left_padding : buttonTextLeftPadding || 3,
			button_text_top_padding : buttonTextTopPadding || 2,
			
			button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,
			button_disabled : false,
			button_cursor : SWFUpload.CURSOR.HAND,
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			
			file_dialog_start_handler : fileDialogStartHandler,
			file_queued_handler : fileQueuedHandler,
			file_queue_error_handler : fileQueueErrorHandler,
			file_dialog_complete_handler : fileDialogCompleteHandler,
			upload_start_handler : uploadStartHandler,
			upload_progress_handler : uploadProgressHandler,
			upload_error_handler : uploadErrorHandler,
			upload_success_handler : uploadSuccessHandler,
			upload_complete_handler : uploadCompleteHandler
		};
		 
		swfUp = new SWFUpload(settings_object);//实例化一个SWFUpload，传入参数配置对象
		exports.swfUp = swfUp; //对外暴露swfup 对象
	}
	exports.fileUpload = fileUpload; //对外暴露fileUpload方法
});