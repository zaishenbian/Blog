layui.config({
  base: '/public/js/admin/'
}).extend({
  common: 'common'
})

//JavaScript代码区域
layui.use(['element','jquery','common'], function () {
  var element = layui.element;
  var $ = layui.jquery;
  var common = layui.common;

  //监听左侧导航
  element.on("nav(nav)", function (elem) {
    let title = elem[0].innerHTML;
    let layId = elem[0].innerText;
    let link = $(elem[0]).attr('link');
    //添加页签
    common.addTab(title, layId, link);
  })

});