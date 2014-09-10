var calendarLang = {
    'cn':{
        'weeks':['日','一','二','三','四','五','六'],
        'months':['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        'today':'今天',
        'y':'年',
        'm':'月',
        'd':'日',
        'close':'关闭',
        'spec':'假日价格',
        'soldout':'售完',
        'week_prefix':'周'
    },
    'tw':{
        'weeks':['日','一','二','三','四','五','六'],
        'months':['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        'today':'今天',
        'y':'年',
        'm':'月',
        'd':'日',
        'close':'關閉',
        'spec':'假日價格',
        'soldout':'售完',
        'week_prefix':'週'
    },
    'en':{
        'weeks':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        'months':['January','February','March','April','May','June','July','August','September','October','November','December'],
        'today':'Today',
        'y':'',
        'm':'',
        'd':'',
        'close':'Close',
        'spec':'Holiday date',
        'soldout':'Sold out date',
        'week_prefix':''
    },
    'es':{
        'weeks':['Dom','Lu','Ma','Mx','Ju','Vi','Sab'],
        'months':['Enero','Feb','Marzo','Abr','Mayo','Jun','Jul','Agosto','Sept','Oct','Nov','Dic'],
        'today':'hoy',
        'y':'',
        'm':'',
        'd':'',
        'close':'cerrar',
        'spec':'Alquiler fecha',
        'soldout':'Agotadas fecha',
        'week_prefix':''
    }
};

(function(e) {
    var a, s, f, g, h, p, t, b, j, m;
    var i, l, o, d;
    var k = {};
    var u = {};
    var n;
    var c = [];
    var r = {};
    var q;

    e.calendar = {
        getDays: function(z, v) {
            var w = ((z % 4 == 0) && (z % 100 != 0)) || (z % 400 == 0);
            var x = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (w) {
                x[1] = 29
            }
            return x[v]
        },
        getWeek: function(x, v, w) {
            return (new Date(x, v, w)).getDay()
        },
        getDayByStr: function(z, y, A) {
            var I = /^(\d+)\-*\/*(\d+)\-*\/*(\d+).*$/;
            var E, K, D, F, x, H;
            var w = z.indexOf("-") > -1;
            var v = z.indexOf("/") > -1;
            if (w) {
                var C = z.match(I);
                E = parseInt(C[1], 10);
                K = parseInt(C[2], 10);
                D = parseInt(C[3], 10)
            }
            if (v) {
                var C = z.match(I);
                E = parseInt(C[3], 10);
                K = parseInt(C[1], 10);
                D = parseInt(C[2], 10)
            }
            var L = {};
            L.year = E;
            L.month = K - 1;
            L.day = D;
            F = e.calendar.getNewDate(L, y);
            var B = F.month + 1 < 10 ? "0" + (F.month + 1) : F.month + 1;
            var G = F.day < 10 ? "0" + F.day: F.day;
            if (w) {
                x = F.year + "-" + B + "-" + G
            }
            if (v) {
                x = B + "/" + G + "/" + F.year
            }
            H = e.calendar.getWeek(F.year, F.month, F.day);
            var J = calendarLang[e.calendar.defaults.lang].week_prefix + calendarLang[e.calendar.defaults.lang].weeks[H];
            if (A) {
                if (typeof A == "string") {
                    x += A.replace("w", J)
                } else {
                    if (typeof A == "object") {
                        x = A.format.replace("yyyy", F.year).replace("mm", B).replace("dd", G).replace("w", J)
                    }
                }
            }
            return x
        },
        getNextDay: function(w, v) {
            return e.calendar.getDayByStr(w, "d+1", v)
        },
        getPrevDay: function(w, v) {
            return e.calendar.getDayByStr(w, "d-1", v)
        },
        init: function(v, X) {

            //基于事件驱动
            v.trigger('initialize', X);

            var w, calendarDiv = e('#calendar'), len = X['dispalyMonths'], html = '';
            if(X['today'] && /^\d{4}-\d{2}-\d{2}$/.test(X['today'])){
                w = new Date(X['today']);
            } else {
                w = new Date();
            }
            q = {
                year: w.getFullYear(),
                month: w.getMonth(),
                day: w.getDate()
            };
            
            calendarDiv.empty();
            
            for(var index=0;index<len;index++){
                html += '<div style="float:left;" class="calendar-month-number" >';
                html += '<div class="calendar-head" id="calendar-head-cls' + index + '">';
                if(index === 0){
                    html += '<a href="javascript:;" id="calendar-prev"></a>';
                }
                html += '<span class="calendar-title" id="calendar-title-cls' + index + '">'
                if(len === 1){
                    html += '<span class="calendar-year"  id="calendar-year-cls' + index + '"></span>';
                    html += '<span class="calendar-month" id="calendar-month-cls' + index + '"></span></span>';
                } else {
                    html += '<span class="calendar-year  calendar-month-more"  id="calendar-year-cls' + index + '"></span>';
                    html += '<span class="calendar-month  calendar-month-more" id="calendar-month-cls' + index + '"></span></span>';
                }
                
                if(index === len - 1){
                    html += '<a href="javascript:;" id="calendar-next"></a>';
                }
                html += '</div>';
                
                html += '<div class="calendar-body" id="calendar-body-cls' + index + '" ';

                if(len > 1 && (index < len -1)){
                    html += 'style="border-right:1px solid #6981BE">';
                } else {
                    html += '>';
                }

                html += '<div class="calendar-weeks" id="calendar-weeks-cls' + index + '"></div>';
                html += '<div class="calendar-days calendar-month-bg" id="calendar-days-cls' + index + '"></div>';
                html += '<div class="calendar-years" id="calendar-years-cls' + index + '"></div>';
                html += '<div class="calendar-months" id="calendar-months-cls' + index + '"></div>';
                html += '</div>';
                
                html += '<div class="calendar-foot" id="calendar-foot-cls' + index + '">';
                
                if(index === 0){
                    html += '<span id="calendar-today"></span>';
                }
                html += '<span class="calendar-tip" id="calendar-tip-cls' + index + '"></span>';
                if(index === len - 1){
                    html += '<span id="calendar-close"></span>';
                }
                html += '</div>';
                html += '</div>';
                
            }
            calendarDiv.append(html);
            
            bindEventFun(len === 1);
            
            n = v;
            u = X;
            e.calendar.hideLists();
            var x, ae, ab, Y, aa, af, w, K, S, L;
            if (e.isArray(u.range)) {
                if (u.range.length > 0) {
                    var I = [];
                    for (var Z = 0; Z < u.range.length; Z++) {
                        var ad = u.range[Z].fragment.split(":");
                        I.push(ad[0]);
                        I.push(ad[1])
                    }
                    var D = [];
                    for (var Z = 0; Z < I.length; Z++) {
                        var B = I[Z].split("-");
                        D.push((new Date(parseInt(B[0], 10), parseInt(B[1], 10) - 1, parseInt(B[2], 10))).getTime())
                    }
                    var J = new Date(Math.min.apply(this, D));
                    var V = new Date(Math.max.apply(this, D));
                    x = J.getFullYear();
                    ae = J.getMonth();
                    ab = J.getDate();
                    aa = V.getFullYear();
                    af = V.getMonth();
                    w = V.getDate()
                } else {
                    var F = q.year + "-" + (q.month + 1) + "-" + q.day;
                    var A = e.calendar.getPrevDay(F).split("-");
                    x = q.year;
                    ae = q.month;
                    ab = q.day;
                    aa = parseInt(A[0], 10);
                    af = parseInt(A[1], 10);
                    w = parseInt(A[2], 10);
                    u.only = u.specific.concat(u.soldout)
                }
            }
            
            if (typeof u.range == "string") {
                if (u.range.indexOf(":") > -1) {
                    if (/^:.+/.test(u.range)) {
                        S = "";
                        L = u.range.replace(":", "")
                    }
                    if (/.+:$/.test(u.range)) {
                        S = u.range.replace(":", "");
                        L = ""
                    }
                    if (/^.+:.+$/.test(u.range)) {
                        var ac = u.range.split(":");
                        S = ac[0];
                        L = ac[1]
                    }
                    if (S == "") {
                        x = q.year;
                        ae = q.month;
                        ab = q.day
                    } else {
                        var W = S.split("-");
                        x = parseInt(W[0] || 1900, 10);
                        ae = parseInt(W[1] || 1, 10) - 1;
                        ab = parseInt(W[2] || 1, 10)
                    }
                    if (L == "") {
                        aa = 2099;
                        af = 11;
                        w = 31
                    } else {
                        var T = L.split("-");
                        aa = parseInt(T[0] || 2099, 10);
                        af = parseInt(T[1] || 12, 10) - 1;
                        if (!T[2]) {
                            w = e.calendar.getDays(aa, af)
                        } else {
                            w = parseInt(T[2], 10)
                        }
                    }
                } else {
                    x = q.year;
                    ae = q.month;
                    ab = q.day;
                    var Q = e.calendar.getNewDate(q, u.range);
                    aa = Q.year;
                    af = Q.month;
                    w = Q.day
                }
            }
            var M = u.specific.concat(u.soldout);
            if (M.length > 0) {
                M.push(x + "-" + (ae + 1) + "-" + ab);
                M.push(aa + "-" + (af + 1) + "-" + w);
                var R = e.calendar.getMinAndMaxDate(M);
                var ag = R.min.split("-");
                var N = R.max.split("-");
                x = parseInt(ag[0], 10);
                ae = parseInt(ag[1], 10) - 1;
                ab = parseInt(ag[2], 10);
                aa = parseInt(N[0], 10);
                af = parseInt(N[1], 10) - 1;
                w = parseInt(N[2], 10)
            }
            Y = (new Date(x, ae, ab)).getTime();
            K = (new Date(aa, af, w)).getTime();
            if (u.start != "") {
                var U = e.calendar.getStartDate();
                var z = U.getFullYear();
                var E = U.getMonth();
                var G = U.getDate();
                var ah = (new Date(z, E, G)).getTime();
                if (ah >= Y && Y <= K) {
                    x = U.getFullYear();
                    ae = U.getMonth();
                    ab = U.getDate();
                    Y = (new Date(x, ae, ab)).getTime();
                    K = (new Date(aa, af, w)).getTime()
                }
            }
            k.r = {
                start_year: x,
                start_month: ae,
                start_day: ab,
                start_time: Y,
                end_year: aa,
                end_month: af,
                end_day: w,
                end_time: K
            };
            if (e.calendar.inRange({
                year: q.year,
                month: q.month,
                day: q.day
            })) {
                k.year = q.year;
                k.month = q.month;
                k.day = q.day
            } else {
                k.year = k.r.start_year;
                k.month = k.r.start_month;
                k.day = k.r.start_day
            }
            if (u.minBookDate != "") {
                var H = u.minBookDate.split("-");
                k.year = parseInt(H[0], 10);
                k.month = parseInt(H[1], 10) - 1;
                k.day = parseInt(H[2], 10);
                k.r.min_book_time = (new Date(k.year, k.month, k.day)).getTime()
            }
            if ( !! u.readout) {
                var C = n.val();
                if (/^.*\d+\/\d+\/\d+.*$/.test(C)) {
                    var y = n.val().split("/");
                    r.year = parseInt(y[2], 10);
                    r.month = parseInt(y[0], 10) - 1;
                    r.day = parseInt(y[1], 10);
                    k.year = parseInt(y[2], 10);
                    k.month = parseInt(y[0], 10) - 1;
                    k.day = parseInt(y[1], 10)
                } else {
                    if (/^.*\d+\-\d+\-\d+.*$/.test(C)) {
                        var y = n.val().split("-");
                        r.year = parseInt(y[0], 10);
                        r.month = parseInt(y[1], 10) - 1;
                        r.day = parseInt(y[2], 10);
                        k.year = parseInt(y[0], 10);
                        k.month = parseInt(y[1], 10) - 1;
                        k.day = parseInt(y[2], 10)
                    } else {
                        r.year = null;
                        r.month = null;
                        r.day = null
                    }
                }
            }
            var P = [];
            for (var Z = k.r.start_year; Z < k.r.end_year + 1; Z++) {
                P.push('<a href="javascript:;" val="' + Z + '">' + Z + "</a>")
            }
            h.html(P.join(""));
            var O = [];
            for (var Z = 1; Z < 13; Z++) {
                if (u.lang == "en") {
                    O.push('<a href="javascript:;" val="' + (Z - 1) + '">' + calendarLang[u.lang].months[Z - 1] + "</a>")
                } else {
                    O.push('<a href="javascript:;" val="' + (Z - 1) + '">' + calendarLang[u.lang].months[Z - 1] + "</a>")
                }
            }
            p.html(O.join(""));
            m = p.find("a");
            h.find("a").click(function() {
                var ai = parseInt(e(this).attr("val"), 10);
                if (ai == k.r.start_year) {
                    if (k.month < k.r.start_month) {
                        k.month = k.r.start_month
                    }
                }
                if (ai == k.r.end_year) {
                    if (k.month > k.r.end_month) {
                        k.month = k.r.end_month
                    }
                }
                k.year = ai;
                e.calendar.buildContent();
                e.calendar.hideLists()
            });
            m.click(function() {
                k.month = parseInt(e(this).attr("val"), 10);
                e.calendar.buildContent();
                e.calendar.hideLists()
            });
            e.calendar.show();
            if (e.calendar.ie6) {
                var ifrs = $(calendarDiv).parent().find('.iframe_calendar');
                var csss = {
                    width: (calendarDiv.width() + 2)+ 'px',
                    height: calendarDiv.height() + 'px',
                    top: calendarDiv.offset().top + 'px',
                    left: calendarDiv.offset().left + 'px'
                }
                ifrs && ifrs.css(csss);
            }
        },
        
        buildContent: function() {
            var calendarDiv = e('#calendar'),
                monthBgNodes = calendarDiv.find('.calendar-month-bg'),
                bgPosition = ['10px 0px', '-215px 0px','-430px 0px','-640px 0px',
                              '10px -120px','-215px -120px','-430px -120px','-640px -120px',
                              '10px -240px','-215px -240px','-430px -240px','-640px -240px'];
            for(var i=0,len=monthBgNodes.length;i<len;i++){
                var temp = k.month + i;
                temp = temp > 11 ? 0 : temp;
                $(monthBgNodes[i]).css('backgroundPosition', bgPosition[temp]);
                //$(monthBgNodes[i]).css('background-position-y', bgPosition[temp][1]);
            }
            
            var A = "", dispalyMonths = u.dispalyMonths;
            a.attr("class", "calendar-" + u.lang);
            var z = calendarLang[u.lang].weeks;
            for (var x = 0; x < z.length; x++) {
                A += "<span>" + z[x] + "</span>"
            }
            var weeksCls = $('.calendar-weeks');
            weeksCls.html(A);
            if (u.lang == "en") {
                for(var i=0,len=dispalyMonths;i<len;i++){
                    var month = k.month + i;
                    $('#calendar-year-cls' + i).html((k.year + Math.floor(month/12)));
                    month = (month > 11 ? (month - 12) : month);
                    $('#calendar-month-cls' + i).html(calendarLang.en.months[month]);
                }
                
            } else {
                for(var i=0,len=dispalyMonths;i<len;i++){
                    var month = k.month + i;
                    $('#calendar-year-cls' + i).html((k.year + Math.floor(month/12)) + calendarLang[u.lang].y);
                    month = (month > 11 ? (month - 12) : month);
                    $('#calendar-month-cls' + i).html(calendarLang[u.lang].months[month]);
                }
            }
            
            
            for(var i=0,len=dispalyMonths;i<len;i++){
                var month = k.month + i,
                    year = k.year + Math.floor(month/12);
                
                month = (month > 11 ? (month - 12) : month);
                
                var v = e.calendar.getWeek(year, month, 1);
                var D = e.calendar.getDays(year, month);
                
                var w = "",
                    y = "",
                    C = "";
                    
                if (v > 0) {
                    for (var x = 0; x < v; x++) {
                        y += "<span></span>"
                    }
                }
                
                var indexOfForArray = function(arr, index){
                    var len = arr.length;
                    for(var i=0;i<len;i++){
                        if(arr[i] === index){
                            return i;
                        }
                    }
                    return -1;
                };
                
                for (var x = 1; x < D + 1; x++) {
                    var weekend = [1, 7, 8, 14, 15, 21, 22, 28, 29, 35, 36, 42],
                        B = "" ;
                    if(indexOfForArray(weekend, (x + v)) > -1){
                        B = 'calendar-weekend ';
                        weekend.unshift();
                    }
                    B += "calendar-normal";
                    if (!e.calendar.inRange({
                        year: year,
                        month: month,
                        day: x
                    })) {
                        B += " calendar-outofdate"
                    } else {
                        if (e.calendar.outOfMinBookDate({
                            year: year,
                            month: month,
                            day: x
                        })) {
                            B += " calendar-outofdate"
                        } else {
                            if (e.calendar.isFit(x, "disabled", i) || !e.calendar.isFit(x, "only", i)) {
                                B += " calendar-disabled"
                            } else {
                                if (year == q.year && month == q.month && x == q.day) {
                                    B += " calendar-today"
                                }
                                if ( !! u.readout) {
                                    if (year == r.year && month == r.month && x == r.day) {
                                        B += " calendar-selected"
                                    }
                                }
                            }
                        }
                    }
                    if (e.calendar.isFit(x, "soldout", i)) {
                        B += " calendar-soldout"
                    }
                    if (e.calendar.isFit(x, "specific", i)) {
                        B = B.replace("calendar-disabled", "");
                        B += " calendar-specific"
                    }
                    w += '<span class="' + B + '">' + x + "</span>"
                }
                
                for (var x = v + D + 1; x < 43; x++) {
                    C += "<span></span>"
                }
                
                $('#calendar-days-cls' + i).html(y + w + C);
            }
            
            e.calendar.setposition();
            e.calendar.bindDayEvents();
            e.calendar.checkStates();
        },
        bindDayEvents: function() {
            t = $('.calendar-days');
            var v = t.find(".calendar-normal").not(".calendar-disabled").not(".calendar-soldout").not(".calendar-outofdate");
            v.hover(function() {
                    e(this).addClass("calendar-hover")
                },
                function() {
                    e(this).removeClass("calendar-hover")
                }).click(function() {
                    var B = e(this);
                    var A = parseInt(B.text());
                    
                    var parentEl = e(this).parents('.calendar-month-number');
                    
                    var year = parseInt(parentEl.find('.calendar-year').text()),
                        month = parseInt(parentEl.find('.calendar-month').text());
                    
                    var x = (month + 1) < 10 ? "0" + month : month;
                    var C = A < 10 ? "0" + A: A;
                    var z = e.calendar.getWeek(year, month, A);
                    var y = calendarLang[u.lang].weeks[z];
                    var D = u.output.replace("yyyy", year).replace("mm", x).replace("dd", C).replace("w", calendarLang[u.lang].week_prefix + y);
                    n.val(D);
                    v.filter(".calendar-selected").removeClass("calendar-selected");
                    e(this).addClass("calendar-selected");
                    if (u.soleClose === false) {
                        e.calendar.hide()
                    }
                    if (u.callback && e.isFunction(u.callback)) {
                        u.callback({
                            date: new Date(year, month, A),
                            dateStr: D.replace(/[^\/\-\d]/g, ""),
                            year: year,
                            month: month,
                            day: A,
                            week: z,
                            weekStr: calendarLang[u.lang].week_prefix + y,
                            today: B.hasClass("calendar-today"),
                            specific: B.hasClass("calendar-specific"),
                            soldout: B.hasClass("calendar-soldout")
                        })
                    }
                });
                
            
                
            t.find(".calendar-today").hover(function() {
                    o = $(this).parents('.calendar-body').parent().find('.calendar-tip');
                    o.addClass("calendar-today-mouseon").html(calendarLang[u.lang].today)
                },
                function() {
                    o = $(this).parents('.calendar-body').parent().find('.calendar-tip');
                    o.removeClass("calendar-today-mouseon").html("")
                });
            t.find(".calendar-specific").hover(function() {
                    o = $(this).parents('.calendar-body').parent().find('.calendar-tip');
                    var w = calendarLang[u.lang].spec;
                    if (e(this).hasClass("calendar-today")) {
                        w += "(" + calendarLang[u.lang].today + ")"
                    }
                    o.html(w)
                },
                function() {
                    o.html("")
                });
            t.find(".calendar-soldout").hover(function() {
                    o = $(this).parents('.calendar-body').parent().find('.calendar-tip');
                    var w = calendarLang[u.lang].soldout;
                    if (e(this).hasClass("calendar-today")) {
                        w += "(" + calendarLang[u.lang].today + ")"
                    }
                    o.html(w)
                },
                function() {
                    o = $(this).parents('.calendar-body').parent().find('.calendar-tip');
                    o.html("")
                })
            
        },
        
        show: function() {

            if(u.showBefore && e.isFunction(u.showBefore)){
                if(u.showBefore() === false){
                    return ;
                }
            }

            e.calendar.buildContent();
            var v = "";
            if (u.lang == "en") {
                var w = calendarLang[u.lang].months[k.month];
                v += w + " ";
                v += q.day + ",";
                v += q.year
            } else {
                v += q.year + calendarLang[u.lang].y;
                v += (q.month + 1) + calendarLang[u.lang].m;
                v += q.day + calendarLang[u.lang].d
            }
            i.html(calendarLang[u.lang].today);
            i.attr("title", v);
            d.html(calendarLang[u.lang].close);
            if (u.hideClose === true) {
                d.hide()
            } else {
                d.show()
            }

            a.show();
            e.calendar.visible = true;
            $('.iframe_calendar').show();
            if (u.showAfter && e.isFunction(u.showAfter)) {
                u.showAfter()
            }
        },
        hide: function() {
            a.hide();
            $('.iframe_calendar').hide();
            e.calendar.visible = false;
            if (u.hideAfter && e.isFunction(u.hideAfter)) {
                u.hideAfter()
            }
        },
        showYears: function() {
            if (h.is(":hidden")) {
                h.show().animate({
                        top: 0
                    },
                    "fast");
                e.calendar.hideMonths()
            } else {
                e.calendar.hideYears()
            }
        },
        showMonths: function() {
            m.show();
            if (k.year == k.r.start_year) {
                m.filter(":lt(" + k.r.start_month + ")").hide()
            }
            if (k.year == k.r.end_year) {
                m.filter(":gt(" + k.r.end_month + ")").hide()
            }
            if (p.is(":hidden")) {
                p.show().animate({
                        top: 0
                    },
                    "fast");
                e.calendar.hideYears()
            } else {
                e.calendar.hideMonths()
            }
        },
        hideYears: function() {
            h.stop().animate({
                    top: -150
                },
                "fast",
                function() {
                    h.hide()
                })
        },
        hideMonths: function() {
            p.stop().animate({
                    top: -150
                },
                "fast",
                function() {
                    p.hide()
                })
        },
        hideLists: function() {
            h.css({
                top: -150
            }).hide();
            p.css({
                top: -150
            }).hide()
        },
        setposition: function() {
            var w = n.offset().left;
            var E = n.offset().top;
            var A = e(window).width();
            var B = e(window).height();
            var D = a.width();
            var z = a.height();
            var v = u.offsetX || 0;
            var C = u.offsetY || n.outerHeight();
            if (w + D > A && u.autoPosition === true) {
                a.css({
                    left: w - (w + D - A) + v
                })
            } else {
                a.css({
                    left: w + v
                })
            }
            if (E + z + C > e(document).scrollTop() + B && u.autoPosition === true) {
                a.css({
                    top: (E - z)
                })
            } else {
                a.css({
                    top: E + C
                })
            }
        },
        dayIsValid: function(y, D, v, index) {
            var I = k.month + index;
            I = (I > 11 ? (I - 12) : I);
            var H = k.year + Math.floor(I/12);
            
            var B = v[D] || (u[D] || []);
            if (D == "only" && e.isArray(B) && B.length == 0) {
                return true
            }
            var J = false;
            var E = {};
            
            if (e.isArray(B) && B.length > 0) {
                for (var x = 0; x < B.length; x++) {
                    if (/^\d+\-\d+\-\d+$/.test(B[x])) {
                        var G = B[x].split("-");
                        E.year = parseInt(G[0], 10);
                        E.month = parseInt(G[1], 10) - 1;
                        E.day = parseInt(G[2], 10);
                        if (E.year == H && E.month == I && E.day == y) {
                        //if(years.indexOf(E.year) > -1 && months.indexOf(E.month) > -1 && E.day == y){
                            J = true
                        }
                    }
                }
            }
            if (typeof B == "string" && B.indexOf(":") > -1) {
                var w = B.split(":");
                if (w[0] == "week") {
                    var A = e.calendar.getWeek(H, I, y);
                    var F = w[1].split("");
                    for (var C = 0; C < F.length; C++) {
                        if (A == parseInt(F[C], 10)) {
                            J = true
                        }
                    }
                }
                if (w[0] == "odevity" && /^(even|odd)$/.test(w[1])) {
                    if (w[1] == "odd" && (y % 2) > 0) {
                        J = true
                    }
                    if (w[1] == "even" && (y % 2) == 0) {
                        J = true
                    }
                }
            }
            return J
        },
        isFit: function(v, w, index) {
            if (w == "specific" || w == "soldout") {
                return e.calendar.dayIsValid(v, w, u, index)
            }
            if ((e.isArray(u.range) && u.range.length > 0)) {
                var y = false;
                for (var A = 0; A < u.range.length; A++) {
                    var x = u.range[A];
                    if (e.calendar.dayInFragment(v, x.fragment) && e.calendar.dayIsValid(v, w, x, index)) {
                        y = true;
                        break
                    }
                }
                return y
            } else {
                return e.calendar.dayIsValid(v, w, u, index)
            }
        },
        getStartDate: function(A) {
            var z;
            if (!isNaN(u.start)) {
                z = new Date(u.start)
            } else {
                if (/^\d+/.test(u.start) && u.start.constructor == String) {
                    var v = u.start.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
                    var y = parseInt(v[1], 10);
                    var B = parseInt(v[2], 10) - 1;
                    var x = parseInt(v[3], 10);
                    z = new Date(y, B, x)
                } else {
                    if (u.start == "today") {
                        u.start = "d+0"
                    }
                    var w = e.calendar.getNewDate(q, u.start);
                    z = new Date(w.year, w.month, w.day)
                }
            }
            return z
        },
        nextMonth: function() {
            var v = e.calendar.getNewDate(k, "m+1", true);
            k.year = v.year;
            k.month = v.month;
            e.calendar.buildContent()
        },
        prevMonth: function() {
            var v = e.calendar.getNewDate(k, "m-1", true);
            k.year = v.year;
            k.month = v.month;
            e.calendar.buildContent()
        },
        inRange: function(z, y) {
            var w = false;
            if ( !! y) {
                var A = (new Date(z.year, z.month, z.day)).getTime();
                var v = (new Date(k.r.start_year, k.r.start_month, 1)).getTime();
                var x = (new Date(k.r.end_year, k.r.end_month, 1)).getTime();
                if (A >= v && A <= x) {
                    w = true
                }
            } else {
                var A = (new Date(z.year, z.month, z.day)).getTime();
                if (A >= k.r.start_time && A <= k.r.end_time) {
                    w = true
                }
            }
            return w
        },
        dayInFragment: function(y, B) {
            var C = k.year;
            var G = k.month;
            var J, D, z, A, F, H;
            var v = B.split(":")[0].split("-");
            J = parseInt(v[0] || 1900, 10);
            D = parseInt(v[1] || 1, 10) - 1;
            z = parseInt(v[2] || 1, 10);
            var x = B.split(":")[1].split("-");
            A = parseInt(x[0] || 2099, 10);
            F = parseInt(x[1] || 12, 10) - 1;
            H = parseInt(x[2], 10);
            var I = false;
            var E = (new Date(C, G, y)).getTime();
            var w = (new Date(J, D, z)).getTime();
            var K = (new Date(A, F, H)).getTime();
            if (E >= w && E <= K) {
                I = true
            }
            return I
        },
        getNewDate: function(G, w, x) {
            if (w.indexOf(",") > -1) {
                filter_styles = w.split(",")
            } else {
                filter_styles = ["" + w + ""]
            }
            var F = 0,
                D = 0,
                A = 0;
            for (var z = 0; z < filter_styles.length; z++) {
                var B = filter_styles[z].match(/^(y|m|d)+(\+|\-)+(\d+)$/);
                var v = B[1];
                var E = B[2];
                var C = B[3];
                if (v == "m") {
                    F += parseInt(E + C, 10)
                }
                if (v == "d") {
                    D += parseInt(E + C, 10)
                }
                if (v == "y") {
                    A += parseInt(E + C, 10)
                }
            }
            if ( !! x) {
                var y = new Date(G.year + A, G.month + F, 1)
            } else {
                var y = new Date(G.year + A, G.month + F, G.day + D)
            }
            return {
                year: y.getFullYear(),
                month: y.getMonth(),
                day: y.getDate()
            }
        },
        checkStates: function() {
            var w = e.calendar.getNewDate(k, "m-1", true);
            if (!e.calendar.inRange(w, true)) {
                f.addClass("calendar-disabled")
            } else {
                f.removeClass("calendar-disabled")
            }
            var v = e.calendar.getNewDate(k, "m+1", true);
            if (!e.calendar.inRange(v, true)) {
                g.addClass("calendar-disabled")
            } else {
                g.removeClass("calendar-disabled")
            }
        },
        visible: false,
        ie6: typeof(document.head && document.head.style.maxHeight) === 'undefined',
        getMinAndMaxDate: function(A) {
            var D = [];
            var z = A.length;
            for (var x = 0; x < z; x++) {
                if (A[x]) var E = A[x].split("-");
                var C = parseInt(E[0], 10);
                var w = parseInt(E[1], 10) - 1;
                var B = parseInt(E[2], 10);
                D.push((new Date(C, w, B)).getTime())
            }
            var F = new Date(Math.max.apply(this, D));
            var v = new Date(Math.min.apply(this, D));
            return {
                max: F.getFullYear() + "-" + (F.getMonth() + 1) + "-" + F.getDate(),
                min: v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate()
            }
        },
        outOfMinBookDate: function(v) {
            if (u.minBookDate == "") {
                return false
            } else {
                var w = (new Date(v.year, v.month, v.day)).getTime();
                if (w < k.r.min_book_time) {
                    return true
                }
            }
        }
    };
    
    
    e.fn.calendar = function(v) {

        var carlendarObj = [];

        return this.each(function() {
            if (!v) {
                var x = e.calendar.defaults
            } else {
                var x = e.extend({},
                    e.calendar.defaults, v)
            }
            if(e.dispalyMonths > 2){
                e.dispalyMonths = 2;
            }
            var w = e(this);
            carlendarObj.push(w);
            w['cfg'] = x ;
            if (x.bind == "") {
                w.bind("focus",
                    function() {
                        if (e.calendar.visible && w == n) {
                            return
                        }
                        if (e.calendar.visible) {
                            e.calendar.hide()
                        }
                        e.calendar.init(w, w['cfg']);
                    })
            } else {
                e(x.bind).bind("click",
                    function(y) {
                        e.calendar.init(w, x)
                    });
                c.push(e(x.bind)[0])
            }
        });
    };
    
    var bindEventFun = function(flag){
        a = e("#calendar");
        s = a.find("#calendar-weeks");
        t = a.find("#calendar-days");
        f = a.find("#calendar-prev");
        g = a.find("#calendar-next");
        l = a.find("#calendar-title");
        i = a.find("#calendar-today");
        o = a.find("#calendar-tip");
        d = a.find("#calendar-close");
        h = a.find(".calendar-years");
        p = a.find(".calendar-months");
        b = a.find("#calendar-year");
        j = a.find("#calendar-month");
        
        f.click(function() {
            e.calendar.hideLists();
            e.calendar.prevMonth()
        }).hover(function() {
                f.addClass("calendar-prev-hover")
            },
            function() {
                f.removeClass("calendar-prev-hover")
            });
        g.click(function() {
            e.calendar.hideLists();
            e.calendar.nextMonth()
        }).hover(function() {
                g.addClass("calendar-next-hover")
            },
            function() {
                g.removeClass("calendar-next-hover")
            });
        i.click(function() {
            k.year = q.year;
            k.month = q.month;
            e.calendar.buildContent();
            e.calendar.hideLists()
        }).hover(function() {
                i.addClass("calendar-today-hover")
            },
            function() {
                i.removeClass("calendar-today-hover")
            });
            
        if(flag){
            b = $('.calendar-year');        
            b.click(e.calendar.showYears).hover(function() {
                b.addClass("calendar-year-hover")
            },
            function() {
                b.removeClass("calendar-year-hover")
            });

            
            j = $('.calendar-month');
            j.click(e.calendar.showMonths).hover(function() {
                j.addClass("calendar-month-hover")
            },
            function() {
                j.removeClass("calendar-month-hover")
            });
        }
        
            
        d.click(e.calendar.hide).hover(function() {
                d.addClass("calendar-close-hover")
            },
            function() {
                d.removeClass("calendar-close-hover")
            });
    };
    
    
    e(function() {
        var v = e("body") ,
			calendarContent = '';
			
		if (e.calendar.ie6) {
			calendarContent = '<iframe frameborder="0" class="iframe_calendar" style="display:none;position:absolute;top:0;left:0;"></iframe>';
		}
        calendarContent += '<div id="calendar"><div style="float:left;"><div class="calendar-head" id="calendar-head-cls0"><a href="javascript:;" id="calendar-prev"></a><span class="calendar-title" id="calendar-title-cls0"><span class="calendar-year"  id="calendar-year-cls0"></span><span class="calendar-month" id="calendar-month-cls0"></span></span><a href="javascript:;" id="calendar-next"></a></div><div class="calendar-body" id="calendar-body-cls0"><div class="calendar-weeks" id="calendar-weeks-cls0"></div><div class="calendar-days" id="calendar-days-cls0"  style="background:url(../imgs/calendar_bg.gif) no-repeat"></div><div class="calendar-years" id="calendar-years-cls0"></div><div class="calendar-months" id="calendar-months-cls0"></div></div><div class="calendar-foot" id="calendar-foot-cls0"><span id="calendar-today"></span><span class="calendar-tip" id="calendar-tip-cls0"></span><span id="calendar-close"></span></div></div></div>';
        v.append(calendarContent);
        bindEventFun(true);
        
        e(document).click(function(z) {
            if (!e.calendar.visible) {
                return
            }
            if (u.soleClose === true) {
                return
            }
            var x = z.target;
            var A = true;
            if (x == n[0] || e.contains(a[0], x)) {
                A = false
            }
            if (c.length > 0) {
                for (var y = 0; y < c.length; y++) {
                    if (x == c[y]) {
                        A = false
                    }
                }
            }
            if (A) {
                e.calendar.hide()
            }
        })
    });
    
    
    
    e.calendar.defaults = {
        dispalyMonths: 2,
        start: "",
        lang: window.CLIENTSTATUS ? window.CLIENTSTATUS.lang: "cn",
        specific: [],
        disabled: [],
        only: [],
        soldout: [],
        output: "yyyy-mm-dd",
        range: "1900-1-1:2099-12-31",
        offsetX: 0,
        offsetY: 0,
        autoPosition: true,
        bind: "",
        readout: false,
        callback: null,
        showAfter: null,
        hideAfter: null,
        soleClose: false,
        hideClose: false,
        minBookDate: ""
    }
})(jQuery);