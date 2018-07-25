layui.use(['jquery'], function(){
  var $ = layui.$;
  
  /*社会主义核心价值观*/
  var socialismWorth = ['prosperity','democracy','civility','harmony','freedom','equality','justice','the rule of law','patriotism','dedication','integrity','friendship'];
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
    var $el = $(`<span class='upword' style='left:${location.x}px;top:${location.y}px;'>${worthStr}</span>`);
    $('body').append($el);
    myTimeout = setTimeout(function(){
      $('.upword').remove();
    }, 790);
  }
  //获取鼠标位置
  function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.clientX + scrollX;
    var y = e.clientY + scrollY;
    return { 'x': x, 'y': y };
  }
});