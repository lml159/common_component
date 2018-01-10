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
        desc: '',
        content: '',
        areaTxt:'',
        btnTxt: '',
        dbtnTxt:['确认','取消'],
        msgArr:[],
        link: '',
        callback:{}
    },
    /**
     * 公用弹窗控件
     * showModal
     */
    showModal: function(callback,type){
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

            popupHtml4: '<div id="popup" class="Mask-box">' +
            '<div class="popup4">' +
            '<h5 class="popup-title">$title</h5>' +
            '<div class="context">$context</div>' +
            '<textarea placeholder="$areaTxt"></textarea>' +
            '<p><a href="javascript:;" class="button-fill done_left">$dbtnTxtLeft</a><a href="javascript:;" class="button-fill done_right">$dbtnTxtRight</a></p>' +
            '</div>' +
            '</div>',

            popupHtml5: '<div id="popup" class="Mask-box">' +
            '<div class="popup5">' +
            '<div class="context">$context</div>' +
            '<a class="link-btn" href="$link">$btnTxt</a>' +
            '<span class="iconfont icon-guanbi close-btn"></span>'+
            '</div>' +
            '</div>',

            popupHtml6: '<div id="popup" class="Mask-box">' +
            '<div class="popup6">' +
            '<div class="context">$context</div>' +
            '<span class="iconfont icon-guanbi close-btn"></span>'+
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
        }else if(globalModal.configure.type == 3){
            contentHtml = modularHtml.popupHtml3
                .replace(/\$link/,globalModal.configure.link)
                .replace(/\$btnTxt/,globalModal.configure.btnTxt);
        }else if(globalModal.configure.type == 4){
            contentHtml = modularHtml.popupHtml4
              .replace(/\$title/,globalModal.configure.title)
              .replace(/\$context/,globalModal.configure.content)
              .replace(/\$areaTxt/,globalModal.configure.areaTxt)
              .replace(/\$link/,globalModal.configure.link)
              .replace(/\$dbtnTxtLeft/,globalModal.configure.dbtnTxt[0])
              .replace(/\$dbtnTxtRight/,globalModal.configure.dbtnTxt[1]);
        }else if(globalModal.configure.type == 5){
            contentHtml = modularHtml.popupHtml5
                .replace(/\$context/,globalModal.configure.content)
                .replace(/\$link/,globalModal.configure.link)
                .replace(/\$btnTxt/,globalModal.configure.btnTxt);
        }else{
            var msg_list = '<ul>',msgArr = globalModal.configure.msgArr;
            for (var p in msgArr) {
                msg_list += '<li><a href="'+msgArr[p].link+'">'+msgArr[p].msg+'<i class="iconfont icon-youyou"></i></a></li>'
            }
            msg_list += '</ul>';
            contentHtml = modularHtml.popupHtml6
                .replace(/\$context/,msg_list);
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
        // 设置弹出动画
        if(globalModal.configure.type == 4){
          setTimeout(function(){
              $(".popup4").addClass('slideUp');
          },100);
          //创建弹框对象
          var $layer = $('#popup');
          // 设置关闭方法
          $layer.close = function(){
            $(".popup4").removeClass('slideUp');
            setTimeout(function(){
                  removeHtml();
            },1000);
          }
          $("#popup .done_left").on('click',function(){
              var value = {
                  area_text:$("#popup textarea").val(),
                  type:type
              };
              // 传值回调
              callback.yes(value,$layer);
          });
          $("#popup .done_right").on('click',function(){
              $layer.close();
          });
        }
        $("#popup .link-btn,#popup .close-btn").on('click',function(){
            removeHtml();
        });

    },
    /**
     * iosSelectSalary
     * 年薪选择弹框
     */
    iosSelectSalary: function(cb_fn,el_id){
        var showSalaryDom = document.querySelector('#'+el_id);
        var data = [{'id': '10001', 'value': '5万以下'},
                    {'id': '10002', 'value': '5-8万'},
                    {'id': '10003', 'value': '8-12万'},
                    {'id': '10004', 'value': '12-15万'},
                    {'id': '10005', 'value': '15-20万'}];

        var salaryId = showSalaryDom.dataset['id'];
        var salaryName = showSalaryDom.dataset['value'];

        var salarySelect = new IosSelect(1,
            [data],
            {
                title: '',
                oneLevelId: salaryId,
                itemHeight: 1,
                headerHeight: 1,
                itemShowCount: 5,
                cssUnit: 'rem',
                showAnimate: true,
                callback: function (selectOneObj) {
                    var value = {
                      selectOneObj:selectOneObj
                    }
                    cb_fn.yes(value);
                }
        });
    },
    /**
     * iosSelectArea
     * 地址选择弹框
     */
    iosSelectArea: function(cb_fn,el_id){
        var showContactDom = document.querySelector('#'+el_id);
        var oneLevelId = showContactDom.dataset['province'];
        var twoLevelId = showContactDom.dataset['city'];
        var iosSelect = new IosSelect(2,
            [iosProvinces, iosCitys],
            {
                title: '地址选择',
                itemHeight: 45,
                relation: [1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                showAnimate: true,
                callback: function (selectOneObj, selectTwoObj) {
                  var value = {
                    selectOneObj:selectOneObj,
                    selectTwoObj:selectTwoObj
                  }
                  cb_fn.yes(value);
                }
        });
    },
    /**
     * iosSelectIndustry
     * 行业选择弹框
     */
    iosSelectIndustry: function(cb_fn,el_id){
        var showContactDom = document.querySelector('#'+el_id);
        var oneLevelId = showContactDom.dataset['industrymain'];
        var twoLevelId = showContactDom.dataset['industry'];
        var iosSelect = new IosSelect(2,
            [first_industrys, second_industrys],
            {
                title: '行业选择',
                itemHeight: 45,
                relation: [1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                showAnimate: true,
                callback: function (selectOneObj, selectTwoObj) {
                  var value = {
                    selectOneObj:selectOneObj,
                    selectTwoObj:selectTwoObj
                  }
                  cb_fn.yes(value);
                }
        });
    },
    /**
     * iosSelectPosition
     * 职位选择弹框
     */
    iosSelectPosition: function(cb_fn,el_id){
        var showContactDom = document.querySelector('#'+el_id);
        var oneLevelId = showContactDom.dataset['positionfirst'];
        var twoLevelId = showContactDom.dataset['positionsecond'];
        var treeLevelId = showContactDom.dataset['positionthird'];
        var fourLevelId = showContactDom.dataset['positionfourth'];
        for (var p in common_positions_1) {
            first_positions.push(common_positions_1[p]);
        }
        for (var q in common_positions_2) {
            second_positions.push(common_positions_2[q]);
        }
        for (var p in common_positions_3) {
            third_positions.push(common_positions_3[p]);
        }
        for (var q in common_positions_4) {
            fourth_positions.push(common_positions_4[q]);
        }
        var iosSelect = new IosSelect(4,
            [first_positions, second_positions, third_positions, fourth_positions],
            {
                title: '职位选择',
                itemHeight: 45,
                relation: [1,1,1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                treeLevelId: treeLevelId,
                fourLevelId: fourLevelId,
                showAnimate: true,
                callback: function (selectOneObj, selectTwoObj,selectThreeObj,selectfourObj) {
                  var value = {
                    selectOneObj:selectOneObj,
                    selectTwoObj:selectTwoObj,
                    selectThreeObj:selectThreeObj,
                    selectfourObj:selectfourObj
                  }
                  cb_fn.yes(value);
                }
        });
    },
    /**
     * iosSelectDate
     * 日期选择弹框
     */
    iosSelectDate: function(cb_fn,el_id){
        var selectDateDom = $('#'+el_id);
        // 初始化时间
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth() + 1;
        var nowDate = now.getDate();
        // 数据初始化
        function formatYear (nowYear) {
            var arr = [];
            for (var i = nowYear - 10; i <= nowYear + 10; i++) {
                arr.push({
                    id: i + '',
                    value: i + '年'
                });
            }
            return arr;
        }
        function formatMonth () {
            var arr = [];
            for (var i = 1; i <= 12; i++) {
                arr.push({
                    id: i + '',
                    value: i + '月'
                });
            }
            return arr;
        }
        function formatDate (count) {
            var arr = [];
            for (var i = 1; i <= count; i++) {
                arr.push({
                    id: i + '',
                    value: i + '日'
                });
            }
            return arr;
        }
        var yearData = function(callback) {
            // setTimeout(function() {
                callback(formatYear(nowYear))
            // }, 2000)
        }
        var monthData = function (year, callback) {
            // setTimeout(function() {
                callback(formatMonth());
            // }, 2000);
        };
        var dateData = function (year, month, callback) {
            // setTimeout(function() {
                if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                    callback(formatDate(31));
                }
                else if (/^(4|6|9|11)$/.test(month)) {
                    callback(formatDate(30));
                }
                else if (/^2$/.test(month)) {
                    if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                        callback(formatDate(29));
                    }
                    else {
                        callback(formatDate(28));
                    }
                }
                else {
                    throw new Error('month is illegal');
                }
            // }, 2000);
        };
            var oneLevelId = nowYear;
            var twoLevelId = nowMonth;
            var threeLevelId = nowDate;
            var iosSelect = new IosSelect(3,
                [yearData, monthData, dateData],
                {
                    title: '日期选择',
                    itemHeight: 45,
                    oneLevelId: oneLevelId,
                    twoLevelId: twoLevelId,
                    threeLevelId: threeLevelId,
                    showLoading: true,
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                      var value = {
                        selectOneObj:selectOneObj,
                        selectTwoObj:selectTwoObj,
                        selectThreeObj:selectThreeObj
                      }
                      cb_fn.yes(value);
                    }
            });
    },
    /**
     * iosSelectTime
     * 时间选择弹框
     */
    iosSelectTime: function(cb_fn,el_id){
        var selectDateDom = $('#'+el_id);
        // 初始化时间
        var now = new Date();
        var nowHours = now.getHours();
        var nowMinutes = now.getMinutes();

        function formatHours () {
            var arr = [];
            for (var i = 1; i <= 24; i++) {
                arr.push({
                    id: i + '',
                    value: i + '时'
                });
            }
            return arr;
        }
        function formatMinutes () {
            var arr = [];
            for (var i = 0; i <= 59; i++) {
                arr.push({
                    id: i + '',
                    value: i + '分'
                });
            }
            return arr;
        }
        var hoursData =  function (callback) {
            // setTimeout(function() {
                callback(formatHours())
            // }, 2000);
        };
        var minutesData =  function (hours, callback) {
            // setTimeout(function() {
                callback(formatMinutes())
            // }, 2000);
        };
            var oneLevelId = nowHours;
            var twoLevelId = nowMinutes;
            var iosSelect = new IosSelect(2,
                [hoursData, minutesData],
                {
                    title: '时间选择',
                    itemHeight: 45,
                    oneLevelId: oneLevelId,
                    twoLevelId: twoLevelId,
                    showLoading: true,
                    callback: function (selectOneObj, selectTwoObj) {
                      var value = {
                        selectOneObj:selectOneObj,
                        selectTwoObj:selectTwoObj
                      }
                      cb_fn.yes(value);
                    }
            });
    }
};
