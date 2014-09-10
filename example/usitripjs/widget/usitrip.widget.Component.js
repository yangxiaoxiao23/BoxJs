/**
 * Created by YHB on 14-8-4.
 */


/**
 * @class usitrip.widget.Component
 * ������Ϊ����������,������������̳и���,�ڸ�����,�ṩһϵ�нӿ�,��Щ�ӿڽ���ʵ�������ʵ��
 *
 */
Usitrip.ns('usitrip.widget');
usitrip.widget.Component = function(config){
    usitrip.widget.Component.superclass.constructor.apply(this, arguments);
    this.addEvents(
        /**
         * @event beforerender
         * �����Ⱦǰ
         * @params {object} component
         */
        'beforerender',

        /**
         * @event beforerender
         * �����Ⱦ��
         * @params {object} component
         */
        'afterrender',

        /**
         * @event beforerender
         * �����ʾǰ
         * @params {object} component
         */
        'beforeshow',

        /**
         * @event beforerender
         * �����ʾ��
         * @params {object} component
         */
        'aftershow',

        /**
         * @event beforehide
         * �������ǰ
         * @params {object} component
         */
        'beforehide',

        /**
         * @event aftershow
         * ������غ�
         * @params {object} component
         */
        'afterhide');

    this.initComponent(config);
}

Usitrip.extend(usitrip.widget.Component, usitrip.event.UsitripEvent, {


    /**
     * ���������id
     * @cfg id {String}
     */
    id: null,

    /**
     * ���������Ⱦ����el�ڵ���
     * @cfg el {String}
     */
    el: null,

    /**
     * ��ʼ��ֵ
     */
    value: null,

    /**
     * �����ʼ�����
     * @param config
     */
    initComponent: function(config){
        Usitrip.apply(this, config);
        this.originValue = value;
        this.render();
    },


    /**
     * �����Ⱦ���
     */
    render: function(){
        if(this.fireEvent('beforerender', this) === false){
            return ;
        }
        this.doRender($(this.el));
        this.fireEvent('afterrender');
    },

    /**
     * ���ʵ����Ⱦ
     * @param targetEl
     */
    doRender: function(targetEl){
        var html = '';
        targetEl.html(html);
        this.component = targetEl.child();
    },


    /**
     * @public
     * @method show ��ʾ���
     */
    show: function(){
        if(this.fireEvent('beforeshow', this) === false){
            return ;
        }
        this.show();
        this.fireEvent('aftershow');
    },

    /**
     * @public
     * @method hide �������
     */
    hide: function(){
        if(this.fireEvent('beforehide', this) === false){
            return ;
        }
        this.hide();
        this.fireEvent('afterhide');
    }
});