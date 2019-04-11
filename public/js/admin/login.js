layui.use(['jquery', 'form', 'layer'], function(){
  var $ = layui.$;
  var form = layui.form;
  var layer = layui.layer;
  
  //登录注册切换
  var $registerBox = $('.admin-user-register-body');
  var $loginBox = $('.admin-user-login-body');
  var $goRegister = $('.admin-register');
  var $goLogin = $('.admin-login');
  var $loginPwd = $('.admin-user-login-body input[name=password]')
  var $loginUsr = $('.admin-user-login-body input[name=username]')
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
    // md5加密
    formdata.field.password = MD5(formdata.field.password)
    formdata.field.repassword = MD5(formdata.field.repassword)
    // 发送注册请求
    $.ajax({
      url: '/api/admin/register',
      async: false,
      type: 'post',
      data: formdata.field,
      success: function(result){
        if(result.code==0){
          $goLogin.click();
        }else{
          layer.msg(result.message);
        }
      }
    });
  });

  //监听登陆表单提交
  form.on('submit(LAY-user-login-submit)', login);

  // 登录密码框绑定回车事件
  $loginPwd.bind('keypress', function($event) {
    if ($event.keyCode === 13) {
      var data = {
        field: {
          username: $loginUsr.val(),
          password: $loginPwd.val()
        }
      }
      login(data)
    }
  })

  // 登录
  function login(data) {
    // md5加密
    data.field.password = MD5(data.field.password)
    // 发送登录请求
    $.ajax({
      url: '/api/admin/login',
      async: false,
      type: 'post',
      data: data.field,
      success: function(result){
        if(result.code==0){
          location.href = '/admin'
        }else if(result.code==2){
          layer.msg('当前账号为非管理员账号，无法登录后台管理系统');
        }else{
          layer.msg(result.message);
        }
      }
    });
  }
});