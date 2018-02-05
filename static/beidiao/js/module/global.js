/**
 * Created by Administrator on 2016/12/5 0005.
 */
/**
 * 页面全局组件
 */
define(['Zepto'], function () {});

var globalModal = {



    /**
     * 弹窗配置参数
     * configure
     */
    configure: {
        type: '1',
        title: '',
        content: '',
        btnTxt: '',
        link: ''
    },

    /**
     * 公用弹窗控件
     * showModal
     */
    showModal: function(){
        /**
         * 弹窗模块内容HTML
         * modularHtml
         */
        var modularHtml = {
            popupHtml1: '<div id="popup" class="Mask-box">' +
            '<div class="popup1">' +
            '<div class="context">$context</div>' +
            '<a class="link-btn" href="$link">$btnTxt</a>' +
            '</div>' +
            '</div>',

            popupHtml2: '<div id="popup" class="Mask-box">' +
            '<div class="popup2">' +
            '<h5 class="popup-title">$title</h5>' +
            '<div class="context">$context' +
            '<a class="link-btn" href="$link">$btnTxt</a></div>' +
            '</div>' +
            '</div>',

            popupHtml3: '<div id="popup" class="Mask-box">' +
            '<div class="popup3">' +
            '<div>' +
            '<i class="iconfont icon-zhucechenggong01"></i>' +
            '<p class="p1">注册成功</p>' +
            '<p class="p2"><span>5</span>秒后跳转</p>' +
            '</div>' +
            '<a class="link-btn" href="$link">$btnTxt</a>' +
            '</div>' +
            '</div>',
        };
        var contentHtml = '';

        var removeHtml = function(){
            $("#popup").remove();
        };

        // 判断连接是否有值

        globalModal.configure.link = globalModal.configure.link?globalModal.configure.link:'javascript:;';

        // 判断弹窗类型
        if(globalModal.configure.type == 1){
            contentHtml = modularHtml.popupHtml1
                .replace(/\$context/,globalModal.configure.content)
                .replace(/\$link/,globalModal.configure.link)
                .replace(/\$btnTxt/,globalModal.configure.btnTxt);
        }else if(globalModal.configure.type == 2){
            contentHtml = modularHtml.popupHtml2
                .replace(/\$title/,globalModal.configure.title)
                .replace(/\$context/,globalModal.configure.content)
                .replace(/\$link/,globalModal.configure.link)
                .replace(/\$btnTxt/,globalModal.configure.btnTxt);
        }else{
            contentHtml = modularHtml.popupHtml3
                .replace(/\$link/,globalModal.configure.link)
                .replace(/\$btnTxt/,globalModal.configure.btnTxt);
        }
        $("body").append(contentHtml);

        // 解除绑定事件
        $(document).off('click','#popup .link-btn');
        $(document).off('touchend','#popup');
        $(document).off('touchend','#popup *');

        // 设置计时跳转
        if(globalModal.configure.type == 3){
            var _number = $("#popup").find(".p2 span").text();
            var timedJump = setInterval(function(){
                _number--;
                if(_number == 0){
                    clearInterval(timedJump);
                    $("#popup .link-btn").click();
                }
                $("#popup").find(".p2 span").text(_number);
            },1000);
        }else{
            // 绑定删除事件
            $(document).on('touchend','#popup',function(event){
                removeHtml();
            });
            $("#popup *").on('touchend',function(event){
                event.stopPropagation();
            });
        }
        $("#popup .link-btn").on('click',function(){
            removeHtml();
        });
    }
};