/**
 * Created by YHB on 2014/9/6.
 */

var Box = new Object();
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
     * @method isFunction 判断是否是函数
     * @param {object} object
     * @returns {boolean}
     */
    isFunction: function(object){
        return typeof object === 'function';
    },

    /**
     * @method isObject 判断是否是一个对象
     * @param {object} object
     * @returns {boolean}
     */
    isObject: function(object){
        return typeof object === 'object';
    },

    /**
     * @method isNumber 判断是否是一个数字
     * @param {object} object
     * @returns {boolean}
     */
    isNumber: function(object){
        return typeof object === 'number';
    },

    /**
     * @method isString 判断是否是字符串
     * @param {object} object
     * @returns {boolean}
     */
    isString: function(object){
        return typeof object === 'string';
    },

    /**
     * @method isUndefined 判断是否是undefined
     * @param {object} object
     * @returns {boolean}
     */
    isUndefined: function(object){
        return typeof object === 'undefined';
    },

    /**
     * @method isEmpty 判断是否是null, underfined, ''
     * @param {object} object
     * @returns {boolean}
     */
    isEmpty: function(object){
        return !!object;
    },

    /**
     * @method isArray 判断是否是一个数组
     * @param {object} object
     * @returns {boolean}
     */
    isArray: function(object){
        return object instanceof Array;
    }
});


Box.copy(this, {
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
                if(value.src.indexOf('/core/Box.js')){

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
     */
    require: function(path) {
        var bodyEl = document.getElementsByTagName('body')[0];
        if (Box.isArray(path)) {
            Box.each(path, function(index, value, obj){
                var scriptEl = document.createElement('script');
                scriptEl.src = value;
                bodyEl.appendChild(scriptEl);
            })
        } else {
            var scriptEl = document.createElement('script');
            scriptEl.src = path;
            bodyEl.appendChild(scriptEl);
        }
    }
});