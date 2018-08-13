layui.use(['jquery', 'form', 'layer'], function(){
  var $ = layui.$;
  var form = layui.form;
  var layer = layui.layer;
  
  //登录注册切换
  var $registerBox = $('.admin-user-register-body');
  var $loginBox = $('.admin-user-login-body');
  var $goRegister = $('.admin-register');
  var $goLogin = $('.admin-login');
  $goRegister.on('click', function(){
    $loginBox.hide();
    $registerBox.show();
  });
  $goLogin.on('click', function(){
    $registerBox.hide();
    $loginBox.show();
  });

  //监听注册表单提交
  form.on('submit(LAY-user-register)', function(formdata){
    console.log(formdata.field);
    $.ajax({
      url: '/api/admin/register',
      async: false,
      type: 'post',
      data: formdata.field,
      success: function(result){
        console.log(result);
        if(result.code==0){
          $goLogin.click();
        }else{
          layer.msg(result.message);
        }
      }
    });
  });

  //监听登陆表单提交
  form.on('submit(LAY-user-login-submit)', function(data){
    console.log('登陆');
  });
});