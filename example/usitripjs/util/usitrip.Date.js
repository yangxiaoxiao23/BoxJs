/**
 * Created with JetBrains WebStorm.
 * User: YHB
 * Date: 14-3-27
 * Time: 下午6:31
 * To change this template use File | Settings | File Templates.
 */

(function(){
    Usitrip.Date = function(){

    };
    Usitrip.apply(Usitrip.Date, {
        /**
         * 日期加、减天数得出新日期
         * @param {String} sdate 原始日期 YYYY-MM-DD
         * @param {Number} days 要加的天数，如果是负数则为减
         * @returns {string} 返回新日期
         */
        delayDate: function(sdate, days) {
            var date = this.strToDate(sdate);
            date.setDate(date.getDate()+days);
            return date.getFullYear() + '-' + Usitrip.Number.lpadZero(date.getMonth()+1) + '-' + Usitrip.Number.lpadZero(date.getDate());
        },

        strToDate: function(str){
            if(str instanceof Date){
                return str;
            }
            if(!/^\d{4}-[01]\d-[0123]\d$/.test(str)){
                return new Date();
            }
            if(Usitrip.isIE){
                var date = str.split('-'),tempDate;
                if(Usitrip.isIE8m){
                    tempDate = new Date(date[0], date[1] - 1, date[2]);
                } else {
                    tempDate = new Date(date[0], date[1] - 1, date[2]);
                    if(tempDate === "NaN-NaN-NaN"){
                        tempDate = new Date(date[0], date[1] - 1, date[2]);
                    }
                }
                return tempDate;
            }
            return new Date(str);
        }
    });
})();
