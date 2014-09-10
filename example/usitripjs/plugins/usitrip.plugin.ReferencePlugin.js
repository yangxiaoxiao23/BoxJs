/**
 * Created by YHB on 14-8-1.
 */
/**
 * 目前支持:  input select
 *参照插件,意思为点过点击参考按钮,将某一个类似的数据(源)复制到目标节点
 */
Usitrip.ns('usitrip.plugin');
usitrip.plugin.ReferencePlugin  = function(config){
    Usitrip.apply(this, config)
    usitrip.plugin.ReferencePlugin.superclass.constructor.apply(this,arguments);
    this.init(config);
}


Usitrip.extend(usitrip.plugin.ReferencePlugin, usitrip.event.UsitripEvent, {

    /**
     * 要绑定按钮的节点
     * @cfg {object} btnEl
     */
    btnEl: null,

    /*源节点*/
    sourceSelector: null,

    /*目标*/
    targetSelector: null,

    /**
     *  组件的映射关系
     *  @cfg {object} mapping
     *   {0:0,1:3,2:'2,4'} 表示源的第一个组件映射到目标的第一个组件,第二个组件映射到第四个组件
     *   第三个组件,映射到第三个和第五个组件,多映射请用',' 分割
     */
    mapping: null,

    init: function(cfg){
        var self = this;
        this.btnEl.live('click', function(){
            var oSource = $(self.sourceSelector);
            var oTarget = $(self.targetSelector);
            var mapping = self.mapping;

            if(mapping){
                var mappingId = mapping['id'];
                var mappingName = mapping['name'];
                var mappingClass = mapping['class'];

                for(var p in mappingClass){
                    var value = mappingClass[p];
                    var sSelector = 'input[class^="' + p + '"],select[class^="' + p + '"]';
                    if(value.indexOf(',') > -1){
                        var arr = value.split(',');
                        for(var i= 0,len=arr.length;i<len;i++){
                            var result = arr[i].replace(/(^\s*)|(\s*$)/g,"");
                            var tSelector = 'input[class^="' + result + '"],select[class^="' + result + '"]';
                            self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                        }
                    } else {
                        var tSelector = 'input[class^="' + value + '"],select[class^="' + value + '"]';
                        self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                    }
                }

                for(var p in mappingName){
                    var value = mappingName[p];
                    var sSelector = 'input[name^="' + p + '"],select[name^="' + p + '"]';
                    if(value.indexOf(',') > -1){
                        var arr = value.split(',');
                        for(var i= 0,len=arr.length;i<len;i++){
                            var result = arr[i].replace(/(^\s*)|(\s*$)/g,"");
                            var tSelector = 'input[name^="' + result + '"],select[name^="' + result + '"]';
                            self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                        }
                    } else {
                        var tSelector = 'input[name^="' + value + '"],select[name^="' + value + '"]';
                        self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                    }
                }

                for(var p in mappingId){
                    var value = mappingId[p];
                    var sSelector = 'input[id^="' + p + '"],select[id^="' + p + '"]';
                    if(value.indexOf(',') > -1){
                        var arr = value.split(',');
                        for(var i= 0,len=arr.length;i<len;i++){
                            var result = arr[i].replace(/(^\s*)|(\s*$)/g,"");
                            var tSelector = 'input[id^="' + result + '"],select[id^="' + result + '"]';
                            self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                        }
                    } else {
                        var tSelector = 'input[id^="' + value + '"],select[id^="' + value + '"]';
                        self.setValue(oSource.filter(sSelector), oTarget.filter(tSelector));
                    }
                }
            } else {
                oSource.each(function(index, el){
                    self.setValue($(this), oTarget.eq(index));
                });
            }
        });
    },


    /**
     * 根据不同的表单元素,设置不同的值
     * @param oSource
     * @param oTarget
     */
    setValue: function(oSource, oTarget){
        if(oSource.is('select')){
            oTarget.val(oSource.val());
        } else {
            var type = oSource.attr('type');
            if(type === 'checkbox'){ //复选框
                oTarget.attr('checked',!!oSource.attr('checked'));
            } else if(type === 'radio') { //单选框
                oTarget.attr('checked',oSource.attr('checked'));
            } else if (type === 'select'){ //下拉框
                oTarget.attr('checked',oSource.attr('checked'));
            } else { //
                oTarget.val(oSource.val());
            }
        }
    }

});