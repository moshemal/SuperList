/**
 * Created by galibr.
 */


define(['jquery', 'modules/Login/Login',  'core/request', 'core/layout'],
  function($, Login, request, layout){
  'use strict';

  function startLoggin(){
    function loginSuccess(){
      console.log("login success moving to application");
      startApp();
      login.destroy();
    }

    function loginFail(){
      console.log("login fail trying again");
      login.resetDeferred();
      login.getPromise().then(loginSuccess, loginFail);
    }

    var login = new Login();
    login.appendTo("#container");
    login.getPromise().then(loginSuccess, loginFail);

      $("#container").on("click","#register",function(){
          login.destroy();
          startRegister();
          return false;
      })
  }

  
  function startApp(){
      layout.createLayout("3W", "#container");
  }

  request.isLoggedIn().then(function() {startApp();},function(){startLoggin();});
});
