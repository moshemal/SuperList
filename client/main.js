/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies', 'core/layout'], 
  function($, Login, cookies, layout){
  'use strict';
  
  var AUTH_STR = "auth";

  function startLoggin(){
    function loginSuccess(){
      console.log("login success moving to application gali: was here.");
      startApp();
      login.destroy();
    }

    function loginFail(){
      console.log("login fail tring again");
      login.resetDeferred();
      login.getPromise().then(loginSuccess, loginFail);
    }

    var login = new Login();
    login.appendTo("#container");
    login.getPromise().then(loginSuccess, loginFail);  
  }
  
  function startApp(){
    layout.createLayout("3W", "#container");
  }

  //checking if allready logged in
  if(cookies.getCookie(AUTH_STR) !== "" ) {
    console.log("starting application");
    startApp();
  } else {
    startLoggin();
  }
});

