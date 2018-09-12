layui.define(['element','jquery'], function(exports) {
  var element = layui.element;
  var $ = layui.jquery;
  var tabs = [];

  //监听tab关闭
  element.on('tabDelete(tab)', function (data) {
    var index = data.index;
    tabs.splice(index - 1, 1);
  })

  var common = {
    addTab: function(title, layId, url){
      $.ajax({
        url: url,
        type: 'get',
        success: function (cont) {
          //防止tab重复添加 
          if (tabs.indexOf(layId) > -1) {
            element.tabChange('tab', layId);
            element.render('tab');
          }else{
            //添加tab
            element.tabAdd('tab', {
              title: title
              , content: cont //支持传入html
              , id: layId
            });
            tabs.push(layId);
            element.tabChange('tab', layId);
          }
        }
      })
    },
    deleteTab: function(layId){
      element.tabDelete('tab', layId);
    }
  }
  exports('common', common);
});