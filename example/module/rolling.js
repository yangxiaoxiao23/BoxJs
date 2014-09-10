/**
 * 滚动模块
 * @param config
 * oDiv 表示包裹滚动的最外层
 * oItems 表示列表的最外层
 * oItem 表示要滚动的对象
 * aA 表示在滚动两边是否有2个按钮 改变滚动方向的
 * normalWidth 表示滚动的对象宽度是否是规则的
 */
function listRoll(config) {
    this.oDiv = config['oDiv'];
    this.oItems = config['oItems'];
    this.oItem = config['oItem'];
    this.aA = config['aA'];
    this.normalWidth = config['normalWidth'];
}

listRoll.prototype = {
    g_bMoveLeft: true,
    g_oTimer: null,
    g_oTimerOut: null,
    g_iSpeed: 2,
    normalWidth: true,

    doRolling: function () {
        var i = 0;
        var width = 0;
        if(this.normalWidth){
            this.oItems.append(this.oItem.clone());
            width = this.oItem.eq(0).outerWidth(true) * this.oItem.length;
            if(width < this.oDiv.outerWidth()){
                return ;
            }
        } else {
            this.oItem.each(function(){
                width += $(this).outerWidth(true);
            });
            if(width < this.oDiv.outerWidth()){
                return ;
            }
            this.oItems.append(this.oItem.clone());
            width = width*2;
        }

        this.oItem = this.oItems.children();
        this.oItems.css('width', width);

        var self = this;

        for (i = 0; i < this.oItem.length; i++) {
            this.oItem[i].onmouseover = function () {
                self.stopMove();
            };

            this.oItem[i].onmouseout = function () {
                self.startMove(self.g_bMoveLeft);
            };
        }

        if (this.aA && this.aA[0]) {
            this.aA[0].onmouseover = function () {
                self.startMove(true);
            };
        }

        if (this.aA && this.aA[1]) {
            this.aA[1].onmouseover = function () {
                self.startMove(false);
            };
        }
        this.startMove(true);
    },

    startMove: function(bLeft) {
        this.g_bMoveLeft = bLeft;

        if (this.g_oTimer) {
            clearInterval(this.g_oTimer);
        }
        this.g_oTimer = setInterval($.proxy(this.doMove, this), 30);
    },

    stopMove: function () {
        clearInterval(this.g_oTimer);
        this.g_oTimer = null;
    },

    doMove: function () {
        var l = this.oItems.position().left;
        if (this.g_bMoveLeft) {
            l -= this.g_iSpeed;
            if (l <= -this.oItems.width() / 2) {
                l += this.oItems.width() / 2;
            }
        }
        else {
            l += this.g_iSpeed;
            if (l >= 0) {
                l -= this.oItems.width() / 2;
            }
        }
        this.oItems.css('left', l + 'px');
    }
}