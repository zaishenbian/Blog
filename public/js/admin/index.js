//JavaScript代码区域
layui.use('element', function () {
  var element = layui.element;
  var $ = layui.jquery;
  var tabs = [];   //

  //监听左侧导航
  element.on("nav(nav)", function (elem) {
    let title = elem[0].innerHTML;
    let layId = elem[0].innerText;
    //防止tab重复添加
    if (tabs.indexOf(layId) > -1) {
      element.tabChange('tab', layId);
      return;
    } else {
      let content = title;
      $.ajax({
        url: '/api/'
      })
      //添加tab
      element.tabAdd('tab', {
        title: title
        , content: content //支持传入html
        , id: layId
      });
      tabs.push(layId);
      element.tabChange('tab', layId);
    }
  })

  //监听tab关闭
  element.on('tabDelete(tab)', function (data) {
    var index = data.index;
    tabs.splice(index - 1, 1);
  })
});