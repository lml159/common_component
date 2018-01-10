/**
 * Created by Administrator on 2016/12/5 0005.
 */
/**
 * 页面通用组件
 */
define(['Zepto','plugin/zepto/event','plugin/zepto/fx','plugin/zepto/ajax','plugin/zepto/touch','plugin/zepto/data','plugin/jquery-heartbeat'], function () {
    /*------------------------------- VARIABLES ----------------------------------*/
    var configMap = {},
        stateMap = {},
        jqueryMap = {},
        /*************** dom method *******************/
        setJqueryMap,initializeFont,initVersion,initSwitchTab,
        /*************** event method *******************/
        goBack,initWebSocket,
        /*************** public method *******************/
        init,
        /*************** workflow method *******************/
        triggerDynamic;
    /*------------------------------- END VARIABLES ----------------------------------*/

    /*------------------------------- DOM ----------------------------------*/
    /**
     * 设置页面viewport比例,rem字体大小
     * initializeFont
     */
    initializeFont = function(){
        ! function(a, b) {
            function c() {
                var b = f.getBoundingClientRect().width;
                b / i > 540 && (b = 540 * i);
                var c = b / 10;
                f.style.fontSize = c + "px", k.rem = a.rem = c
            }
            var d, e = a.document,
                f = e.documentElement,
                g = e.querySelector('meta[name="viewport"]'),
                h = e.querySelector('meta[name="flexible"]'),
                i = 0,
                j = 0,
                k = b.flexible || (b.flexible = {});
            if(g) {
                /*console.warn("将根据已有的meta标签来设置缩放比例");*/
                var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
                l && (j = parseFloat(l[1]), i = parseInt(1 / j))
            } else if(h) {
                var m = h.getAttribute("content");
                if(m) {
                    var n = m.match(/initial\-dpr=([\d\.]+)/),
                        o = m.match(/maximum\-dpr=([\d\.]+)/);
                    n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
                }
            }
            if(!i && !j) {
                var p = a.navigator.userAgent,
                    q = (!!p.match(/android/gi), !!p.match(/iphone/gi)),
                    r = q && !!p.match(/OS 9_3/),
                    s = a.devicePixelRatio;
                i = q && !r ? s >= 3 && (!i || i >= 3) ? 3 : s >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i
            }
            if(f.setAttribute("data-dpr", i), !g)
                if(g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g);
                else {
                    var t = e.createElement("div");
                    t.appendChild(g), e.write(t.innerHTML)
                }
            a.addEventListener("resize", function() {
                clearTimeout(d), d = setTimeout(c, 300)
            }, !1), a.addEventListener("pageshow", function(a) {
                a.persisted && (clearTimeout(d), d = setTimeout(c, 300))
            }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function() {
                e.body.style.fontSize = 12 * i + "px"
            }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function(a) {
                var b = parseFloat(a) * this.rem;
                return "string" == typeof a && a.match(/rem$/) && (b += "px"), b
            }, k.px2rem = function(a) {
                var b = parseFloat(a) / this.rem;
                return "string" == typeof a && a.match(/px$/) && (b += "rem"), b
            }
        }(window, window.lib || (window.lib = {}))
    };

    /**
     * 初始化Tab切换
     * initSwitchTab
     */
    initSwitchTab = function(){
        $(document).on('touchend','.m-tab-title-box ul li',function(){
            $(this).addClass("active").siblings("li").removeClass("active");
            $(".m-tab-content-box > div").eq($(this).index()).show().siblings().hide();
        });
    };

    /**
     * initVersion
     * 初始化版本号
     */
    initVersion = function () {
        var domains = ['localhost', '127.0.0.1'],
            ENVIRONMENT = location.hostname,
            $script = $('script[data-requirecontext="_"]');

        if (domains.indexOf(ENVIRONMENT) == -1) {
            //生产环境 -> 设置构建版本号
            $script.each(function () {
                var src = $(this).attr('src');
                $(this).attr('src', src + '?version=${BUILD-DATE}');
            });
        } else {
            //开发环境 -> 设置时间戳禁止缓存
            $script.each(function () {
                var src = $(this).attr('src');
                $(this).attr('src', src + '?timestamp=' + new Date().getTime());
            });
        }
    };


    // 重新alert方法
    window.alert = function(msg){
        $("#alert-box").remove();
        var altHtml = '<div id="alert-box" class="alert-box"><span>'+ msg +'</span><div>';
        $('body').append(altHtml);
        setTimeout(function(){$("#alert-box").animate({
            opacity: 0,
        }, 500, 'ease-out',function(){
            $("#alert-box").remove();
        })},1500);
    };

    // 设置弱类型弹框
    window.popMsg = function(msg,type){
        $("#popup_weak").remove();
        var altHtml = '';
        switch(type){
          case 'success':
            altHtml = '<div id="popup_weak" class="popup_weak"><p><span class="iconfont icon-caozuochenggong"></span>'+msg+'</p></div>';
          break;
          case 'fail':
            altHtml = '<div id="popup_weak" class="popup_weak"><p><span class="iconfont icon-guanbi"></span>'+msg+'</p></div>';
          break;
          case 'notice':
            altHtml = '<div id="popup_weak" class="popup_weak"><p><span class="iconfont icon-zhiweixiangqing-xiugaizhuangtai"></span>'+msg+'</p></div>';
          break;
          default:
            altHtml = '<div id="popup_weak" class="popup_weak"><p>'+msg+'</p></div>';
          break;
        }

        $('body').append(altHtml);
        setTimeout(function(){$("#popup_weak").animate({
            opacity: 0,
        }, 500, 'ease-out',function(){
            $("#popup_weak").remove();
        })},1500);
    };
    /**
     * setJqueryMap
     * 缓存jquery集合
     */
    setJqueryMap = function() {

    };

    /*------------------------------- END DOM ----------------------------------*/

    /*------------------------------- EVENT ----------------------------------*/
    /**
     * goBack
     * 返回按钮公共事件
     */
    goBack = function(){
      var u = navigator.userAgent;
      var goBack= document.getElementById("goBack");
      if(!goBack){return};
      //针对ios原生浏览器处理
      if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && /(Safari)/i.test(u)){
          goBack.setAttribute("onclick","javascript:window.location=document.referrer;");
      }else{
          goBack.setAttribute("onclick","javascript:window.history.go(-1);");
      }
    };
    /*------------------------------- END EVENT ----------------------------------*/

    /*------------------------------- PUBLIC ----------------------------------*/
    initWebSocket = function(){
      var client_id = "101";
      $.jheartbeat.set({
          url: "/company/message/?id=" + client_id, // The URL that jHeartbeat will retrieve
          delay: 60000 // How often jHeartbeat should retrieve the URL
      });

      socket = new WebSocket("ws://" + window.location.host + "/company/message/");
      socket.onopen = function () {
          socket.send(client_id + "|" + $("#message").val());//发送数据到服务端
          //socket.send(client_id);//发送数据到服务端
      };
      socket.onmessage = function (e) {
          $('#messagecontainer').prepend('<p>' + e.data + '</p>');
      };

      $("#send_message").click(function(){
          socket.send($("#client_id").val() + "|" + $("#message").val());//发送数据到服务端
      })
    }
    /**
     * init
     * 初始化通用组件
     */
    init = function () {
        // 初始化页面viewport比例与rem字体大小
        initializeFont();
        // 初始化Tab标签切换
        initSwitchTab();
        // 自动激活动态化
        triggerDynamic();
        // 初始化版本号
        initVersion();
        // 初始化返回按钮事件
        goBack();
        // 初始化websocket 组件
        // initWebSocket();
        document.getElementsByTagName("body")[0].style.display = "block";
    };
    /*------------------------------- END PUBLIC ----------------------------------*/

    /*------------------------------- WORKFLOW ----------------------------------*/
    /**
     * triggerDynamic
     * 自动激活动态化
     */
    triggerDynamic = function () {
        var _dynamic = dynamic !== undefined && dynamic.main !== undefined ? dynamic : {main: function () {}};
        _dynamic.main(function (scope) {
            for (var i in scope) {
                try {
                    if (typeof scope[i] == 'function' && i.indexOf('init') > -1) {
                        scope[i]();
                    }
                } catch (e) {
                    alert(e);
                }
            }
        });
    };
    /*------------------------------- END WORKFLOW ----------------------------------*/

    return {
        init: init()
    };
});
