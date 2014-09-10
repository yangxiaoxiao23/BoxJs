/**
 * Created by YHB on 14-8-4.
 */

Usitrip.ns('usitrip.widget');

usitrip.widget.Field = function(config){
    usitrip.widget.Field.superclass.constructor.apply(this, arugments);
    this.addEvents(
        /**
         * @event keydown  ���̰���
         * @params {object} component ��ǰ��� ��ǰ���
         * @params {object} ev �¼�
         */
        'keydown',

        /**
         * @event keyup ���̰��º���
         * @params {object} component ��ǰ���
         * @params {object} ev
         */
        'keyup',

        /**
         * @event stylechange ��ǰ�����ʽ�����ı�
         * @params {object} component ��ǰ���
         * @params {object} style ��ʽ����
         */
        'stylechange',

        /**
         * @event classchange ��ǰ�����class���Ա仯
         * @params {object} component ��ǰ���
         * @params {string} type �������� add remove removeAll
         * @params {string} clazz ��������ɾ����class��
         */
        'classchange',

        /**
         * @event beforedestroy �������ǰ
         * @params {object} component ��ǰ���
         */
        'beforedestroy',

        /**
         * @event afterdestroy ������ٺ�
         * @params {object} component ��ǰ���
         */
        'afterdestroy',

        /**
         * @event beforefocus �����ý���ǰ
         * @params {object} component ��ǰ���
         */
        'beforefocus',

        /**
         * @event focus �����ý����
         * @params {object} component ��ǰ���
         */
        'focus',

        /**
         * @event disabled ���disabled״̬�ı�
         * @params {object} component ��ǰ���
         * @params {boolean} disabled
         */
        'disabled',

        /**
         * @event height ����߶ȷ����ı�
         * @params {object} component ��ǰ���
         * @params {number} height �ı�ĸ߶�
         */
        'height',

        /**
         * @event pageposition ��������൱�ڴ��ڵ�λ��
         * @params {object} component ��ǰ���
         * @params {object} positionObj �൱�ڴ���λ�õ�ֵ
         */
        'pageposition',

        /**
         * @event position ����Ķ�λ�ı�
         * @params {object} component ��ǰ���
         * @params {String} position ����Ķ�λ
         */
        'position',

        /**
         * @event readonly  ���readOnly״̬�ı�
         * @params {object} component ��ǰ���
         * @params {boolean} readOnly
         */
        'readonly',

        /**
         * @event resize �����С�ı�
         * @params {object} component ��ǰ���
         * @params {object} size
         */
        'resize',

        /**
         * @event visible ����ɼ�״̬״̬�ı�
         * @params {object} component ��ǰ���
         * @params {boolean} visible
         */
        'visible',

        /**
         * @event width �����ȸı�
         * @params {object} component ��ǰ���
         * @params {number} width
         */
        'width',

        /**
         * @event validate
         * @params {object} component ��ǰ���
         * @params {String} reg
         */
        'validate',

        /**
         * @event valuechange
         * @params {object} component ��ǰ���
         * @params {String/Boolean/Number/Object} oldValue
         *  @params {String/Boolean/Number/Object} newValue
         */
        'valuechange'
    );
}

Usitrip.extend(usitrip.widget.Field, usitrip.widget.Component , {

    /**
     * @cfg {String} reg
     * ����ʱ����֤����
     */
    reg: null,


    /**
     * @cfg {number} height
     * ����ĳ�ʼ���߶�
     */
    height: 24,


    /**
     * @cfg {number} width
     * ����ĳ�ʼ�����
     */
    width: 120,

    doRender: function(targetEl){
        usitrip.widget.Field.superclass.doRender.apply(this, targetEl);
    },

    initEvent: function(){
        usitrip.widget.Field.superclass.initEvent.apply(this, targetEl);
        this.component.keydown(function(ev){
            if(this.fireEvent('keydown', this, ev) === false) {
                return;
            }
        });

        this.component.keyup(function(ev){
            this.fireEvent('keyup', this, ev);
        });
    },

    /**
     * @method setStyle �����������ʽ
     * @param style {Object} ��ʽ
     */
    setStyle: function(style){
        this.component.css(style);
        this.fire('stylechange', this, style);
    },

    /**
     * @method addClass ����CLASS
     * @param clazz {String} class��
     */
    addClass: function(clazz){
        this.component.addClass(clazz);
        this.fireEvent('classchange', this, 'add', clazz);
    },

    /**
     * @method removeClass ɾ��Class
     * @param clazz {String} class��
     */
    removeClass: function(clazz){
        this.component.removeClass(clazz);
        this.fireEvent('classchange', this, 'remove', clazz);
    },

    /**
     * @method removeAllClass ɾ�����е�class��ʽ
     */
    removeAllClass: function(){
        this.component.removeAllClass();
        this.fireEvent('classchange', this, 'removeall');
    },

    /**
     * @method destroy �������,ͬʱ�󶨵��¼���������
     */
    destroy: function(){
        if(this.fireEvent('beforedestroy', this) === false) {
            return;
        }
        this.component.remove();
        this.fireEvent('afterdestroy', this);
    },


    /**
     * @method focus �������ȡ����
     */
    focus: function(){
        if(this.fireEvent('beforefocus', this) === false) {
            return;
        }
        this.component.focus();
        this.fireEvent('focus', this)
    },

    /**
     * @method getHeight ��ȡ����ĸ߶�
     * @returns {number} ��������ĸ߶�
     */
    getHeigh: function(){
        return this.component.height();
    },

    /**
     * @method getWidth ��ȡ����Ŀ��
     * @returns {number} ��������Ŀ��
     */
    getWidth: function(){
        return this.component.width();
    },

    /**
     * @method getId ��ȡ�����ID
     * @returns {number} ���������ID
     */
    getId: function(){
        return this.component.att('id');
    },

    /**
     * @method getClass ��ȡ�����Class
     * @returns {number} ���������Class
     */
    getClass: function(){
        return this.component.att('class');
    },

    /**
     * @method getPosition ��ȡ����Ķ�λ
     * @returns {number} ��������Ķ�λ
     */
    getPosition: function(){
        return this.component.css('position');
    },

    /**
     * @method getOutSize ��ȡ����ĳߴ�(�����߾�)
     * @returns {{width: *, height: *}}
     */
    getOutSize: function(){
        return {
            width: this.component.outerWidth(),
            height: this.component.outerHeight()
        }
    },

    /**
     * @method getSize ��ȡ����ĳߴ�(�������߾�)
     * @returns {{width: *, height: *}}
     */
    getSize: function(){
        return {
            width: this.component.width(),
            height: this.component.height()
        }
    },

    /**
     * @method isDirty �Ƿ���������(�޸Ĺ���)
     * @returns {boolean}
     */
    isDirty: function(){
        if(this.getValue() === this.originValue){
            return false;
        } else {
            return true;
        }
    },

    /**
     * @method isVisible ����Ƿ�����ʾ��
     * @returns {boolean}
     */
    isVisible: function(){
        return this.component.is(':show');
    },

    /**
     * @method ��������
     */
    reset: function(){
        this.fireEvent('reset', this);
    },

    /**
     * @method setDisabled �������disabled״̬
     * @param disabled {boolean}
     */
    setDisabled: function(disabled){
        this.component.attr('disabled', !!disabled);
        this.fireEvent('disabled', this, disabled);
    },

    /**
     * @method setHeight ��������ĸ߶�
     * @param height {number}
     */
    setHeight: function(height){
        this.component.css('height', height);
        this.fireEvent('height', this, height);
    },

    /**
     * @method setPagePosition �����������ڵ�ǰҳ�����ʽ
     * @param positionObj ���� left �� top ��ֵ
     */
    setPagePosition: function(positionObj){
        this.component.css(positionObj);
        this.fireEvent('pageposition', this, positionObj);
    },

    /**
     * @method setPosition ����Ԫ�صĶ�λ
     * @param position {String}
     */
    setPosition: function(position){
        this.component.css('position', position);
        this.fireEvent('position', this, position);
    },

    /**
     * @method setReadOnly ���������ֻ��
     * @param readOnly {boolean}
     */
    setReadOnly: function(readOnly){
        this.component.css('readOnly', !!readOnly);
        this.fireEvent('readonly', this, readOnly);
    },

    /**
     * @method setSize ��������Ŀ��
     * @param size {Object} ����width��height��������
     */
    setSize: function(size){
        this.component.css(size);
        this.fireEvent('resize', this, size);
    },

    /**
     * @method setVisible ��������Ƿ�ɼ�
     * @param visible {boolean}
     */
    setVisible: function(visible){
        this.component.css('visibility', visible ? 'visible' : 'hidden');
        this.fireEvent('visible', this, visible);
    },

    /**
     * @method setWidth ��������Ŀ��
     * @param width {number}
     */
    setWidth: function(width){
        this.component.width(width);
        this.fireEvent('width', this, width);
    },

    /**
     * @method vilidate �������ʱ�����֤
     * @param reg ��Ҫ��֤��������ʽ,��û�����ȡ��ǰ�����reg����
     */
    validate: function(reg){
        reg = reg || this.reg;
        this.fireEvent('validate', this, reg);
    },

    /**
     * @method setValue ����ֵ
     * @value {obj} value
     */
    setValue: function(value){
        var oldValue = this.getValue();
        this.value = value;
        this.fireEvent('valuechange', this, oldValue, value);
    },

    /**
     * @method getValue ��ȡ�����ֵ
     * @returns {obj}
     */
    getValue: function(){
        return this.value;
    }
});