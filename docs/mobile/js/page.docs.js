/**
 * 加载配置文件，然后加载当前页面模块对应业务逻辑
 * 当只加载一个模块时，匿名函数形参可不写
 * 加载多模块时，匿名函数形参需与模块加载顺序一一对应，以便正确获取模块对象
 */
define(['../../../static/beidiao/js/config/common'], function () {
    requirejs(['../../../docs/mobile/js/app/docs']);
});

/*!
 * 需要和后端交互的方法
 * 命名空间必须是 dynamic ！
 * 异步生成（刷新）DOM 节点后需要使用的通用组件（插件），具体参见 docs.hcdyhr.com/docs/examples/ 。
 * 对象 main 用于绑定 document.ready 事件，必须声明且不要修改。
 * 需要使用 jQuery 对象的业务必须封装在具体的对象（方法）中，命名中必须包含 init 关键字。
 * DOM 节点属性绑定的事件如 <a href="javascript:;" onclick="dynamic.buyResume();">A链接节点</a> 可随意使用 jQuery ！
 *
 * Date: 2016/10/23 bk
 */
var dynamic = {
    main: function (callback) {
        var _this = this;
        callback(_this);
    },

    /**
     * 普通弹窗
     * popupBtn1
     */
    popupBtn1: function(){
        globalModal.configure = {
            type: '1',
            content: '<p style="text-align: left">根据《征信业管理条例》第十八条规定，向征信机构查询个人信息的，应当取得信息主体本人的书面同意并约定用途，但是，法律规定可以不经同意查询的除外，征信机构不得违反前款规定提供个人信息。</p> <p style="text-align: left">勾选以获取该查询用户授权即默认您已获取该查询用户授权，如若发生法律纠纷，我方不承担任何责任。<p>',
            btnTxt: '知道了',
            link: '' //设置连接 如只是关闭弹窗不需要传值，如需要跳转请输入连接。
        };
        globalModal.showModal();
    },

    /**
     * 带标题的弹窗
     * popupBtn3
     */
    popupBtn2: function(){
        globalModal.configure = {
            title: '加入经纪人公司',
            type: '2',
            content: '自定义thml或文字信息',
            btnTxt: '注册',
            link: '#' //设置连接 如只是关闭弹窗不需要传值，如需要跳转请输入连接。
        };
        globalModal.showModal();
    },

    /**
     * 自动跳转弹窗
     * popupBtn3
     */
    popupBtn3: function(){
        globalModal.configure = {
            type: '3',
            btnTxt: '直接进入',
            link: '#' //设置连接 如只是关闭弹窗不需要传值，如需要跳转请输入连接。
        };
        globalModal.showModal();
    }
};