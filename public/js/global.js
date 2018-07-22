layui.use(['jquery'], function(){
  var $ = layui.$;
  
  /*社会主义核心价值观*/
  var socialismWorth = ['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'];
  var worthIndex = 0;
  var myTimeout;
  $('body').click(function(event){
    clearTimeout(myTimeout);
    $('.upword').remove();
    var location = getMousePos(event);
    upword(location, socialismWorth[worthIndex]);
    if(worthIndex === socialismWorth.length-1){
      worthIndex = 0;
    }else{
      worthIndex++;
    }
  }); 
  //文字上升效果
  function upword(location, worthStr){
    var $el = $(`<span style='left:${location.x}px;top:${location.y}px;'>${worthStr}</span>`);
    $('body').append($el);
    $el.addClass('upword');
    myTimeout = setTimeout(function(){
      $('.upword').remove();
    }, 1000);
  }
  //获取鼠标位置
  function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
  }
});