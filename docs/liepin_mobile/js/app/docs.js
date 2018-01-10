define(['Zepto','module/common','module/global','plugin/iosSelect'], function () {
    /*------------------------------- VARIABLES ----------------------------------*/
    var configMap = {

        },
        stateMap = {

        },
        jqueryMap = {},
        /*************** dom method *******************/
        setJqueryMap,
        /*************** event method *******************/

        /*************** public method *******************/
        init;
    /*------------------------------- END VARIABLES ----------------------------------*/

    /*------------------------------- DOM ----------------------------------*/
    /**
     * setJqueryMap
     * 缓存jquery集合
     */
    setJqueryMap = function() {
        jqueryMap = {

        };
    };
    /*------------------------------- END DOM ----------------------------------*/

    /*------------------------------- EVENT ----------------------------------*/

    /*------------------------------- END EVENT ----------------------------------*/
    // 按钮吸顶效果
    showFixed = function(){
      var el = $('#p-fixed'),
          el_top = el.offset().top;
          win_height =$(window).height();
          el_height =el.height();
          $(window).scroll(function(){
            var win_top = $(window).scrollTop();
            if(el_top < win_top + win_height - 1.4*el_height){
              el.addClass('footer-btns-fixed');
            }else{
              el.removeClass('footer-btns-fixed');
            };
          });
    }
    /*------------------------------- PUBLIC ----------------------------------*/
    /**
     * init
     * 页面初始化方法
     */
    init = function () {
        // document.ready
        $(function () {
            // 缓存jquery集合
            setJqueryMap();
            showFixed();
        });
    };
    /*------------------------------- END PUBLIC ----------------------------------*/

    return init();
});
