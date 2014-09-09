/**Box.js
 * Created by YHB on 2014/9/6.
 */

if(typeof Object.create !== "function"){
    Object.create = function(o){
        function F(){};
        F.prototype = o;
        return new F();
    }
}

var Box = Object.create({});
Box.index = 0;

/**
 * @method id 维护BoxJs索引
 * @returns {number}
 */
Box.id = function(){
    return Box.index++;
}

/**
 * @method copy 将cfg2的值复制到cfg1上,并返回最新的cfg1值
 * @param {object} cfg1
 * @param {object} cfg2
 * @returns {object}
 */
Box.copy = function(cfg1, cfg2){
    for(var attr in cfg2){
        cfg1[attr] = cfg2[attr];
    }
    return cfg1;
}


Box.copy(Box, {
    /**
     * @method isType 利用闭包生成判断类型的函数
     * @param type
     * @returns {Function}
     */
    isType: function(type){
        return function(obj){
            return toString.call(obj) =='[object ' + type + ']';
        }
    }
});


Box.copy(Box, {

    /**
     * @method isFunction 判断是否是函数
     * @param {object} object
     * @returns {boolean}
     */
    isFunction: Box.isType('Function'),

    /**
     * @method isObject 判断是否是一个对象
     * @param {object} object
     * @returns {boolean}
     */
    isObject: Box.isType('Object'),

    /**
     * @method isNumber 判断是否是一个数字
     * @param {object} object
     * @returns {boolean}
     */
    isNumber: Box.isType('Number'),

    /**
     * @method isString 判断是否是字符串
     * @param {object} object
     * @returns {boolean}
     */
    isString: Box.isType('String'),

    /**
     * @method isArray 判断是否是一个数组
     * @param {object} object
     * @returns {boolean}
     */
    isArray: Box.isType('Array'),

    /**
     * @method isBoolean 判断是否是一个布尔类型
     * @param {object} object
     * @returns {boolean}
     */
    isBoolean: Box.isType('Boolean'),

    /**
     * @method isUndefined 判断是否是undefined
     * @param {object} object
     * @returns {boolean}
     */
    isUndefined: function(object){
        return typeof object === 'undefined';
    },

    /**
     * @method isNull 判断是否是undefined
     * @param {object} object
     * @returns {boolean}
     */
    isNull: function(obj) {
        if (!obj && typeof(obj) != "undefined" && obj != 0) {
            return true;
        }
        return false;
    },

    /**
     * @method isEmpty 判断是否是null, undefined, ''
     * @param {object} object
     * @returns {boolean}
     */
    isEmpty: function(object){
        return !!object;
    }
});


Box.copy(Box, {
    /**
     * @method each 遍历所给参数
     * @param object
     * @param fn
     *        1.当object是一个数组时,回调的fn共有3个参数,第一个为数组的索引,第二个参数为当前循环的值,第三个为当前需要遍历的数组
     *        2.当object是一个对象时,回调的fn共有3个参数,第一个为对象的属性,第二个参数为当前属性值,第三个为当前需要遍历的对象
     */
    each: function(object, fn){
        if(Box.isArray(object)){
            for(var i= 0,len=object.length;i<len;i++){
                fn.apply(this, [i, object[i], object]);
            }
        } else {
            for(var p in object){
                fn.apply(this, [p, object[p], object]);
            }
        }
    }
});

/**
 * @method onReady 表示页面加载完成
 * @param callback
 */
Box.onReady = function(callback){
    window.onload = function(){
        if(Box.isFunction(callback)){
            callback();

        var bodyEl = document.getElementsByTagName("");
            var pageAllScript = document.scripts;
            Box.each(pageAllScript, function(index, value, object){
                if(value.src && value.src.indexOf('/core/Box.js')){

                }
            });


        } else {
            throw new Error('arguments error!');
        }
    }
}

Box.copy(Box, {

    /**
     * @method require 通过require加载传入的path路径
     * @param path
     * @param fn
     */
    require: function(path, fn) {
        var bodyEl = document.getElementsByTagName('body')[0];
        if (Box.isArray(path)) {
            Box.each(path, function(index, value, obj){
                this.engine(value);
            })
        } else {
            this.engine(path);
        }
        if(Box.isFunction(fn)){
            fn();
        }
    },

    engine: function(filePath){
        var scriptEl = document.createElement('script');
        scriptEl.src = filePath;
        bodyEl.appendChild(scriptEl);
    }
});

Box.copy(Box, {

    /**
     * @method extend 类上的属性扩展,这里支持回调函数extended
     * @param o
     */
    extend: function(o){
        var extended = o.extended; //回调
        Box.copy(Box, o);
        if(extended){
            extended(this);
        }
    },

    /**
     * @method include 实例的属性扩展,这里支持回调函数extended
     * @param o
     */
    include: function(o){
        var included = o.included;//回调
        Box.copy(this.prototype, o);
        if(included){
            included(this);
        }
    }
});

Box.copy(Box, {
    /**
     * @method package 创建包解决
     * @param packageNs
     */
    package: function(packageNs){
        var folders = packageNs.split('.');
        var folder = null;
        var ns = null;
        while((folder = folders.unshift())) {
            if(typeof ns === 'undefined'){
                ns = Object.create({});
            } else if(typeof ns[folder] === 'undefined'){
                ns[folder] = Object.create({});
            }
        }
    }
});