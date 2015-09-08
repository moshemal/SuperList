/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies', 'core/layout','core/windowcreate','core/request'],//'modules/ListView/ListView','core/list' ], 
  function($, Login, cookies, layout, window,request){
  'use strict';
  //global vars
  var AUTH_STR = "auth";
	var login;
	//var create;
	var user;
	var lst;
//for User exsiset	
  function startLoggin(){
    
	function loginSuccess(){
      console.log("login success moving to application gali: was here.");  
      startApp();
      login.destroy(); //go to the splitter
    }

    function loginFail(){
		console.log("login fail trying again");
		login.resetDeferred();
		login.getPromise().then(loginSuccess, loginFail);
		
    }
	
    login = new Login(); //
    login.appendTo("#container");//
	login.$.find("#createbtn").on('click', function(){startCreate();});//???
    
	login.getPromise().then(loginSuccess, loginFail);  

  }
  
  
  
  function startApp(){
    layout.createLayout("3W", "#container");
	//list=new ListView();
	request.upload();
	
//	menu.createMenu("panelBar", "#megaStore");
	window.createButton("buttonPlus", "#windowButton");
	

  }

  //the beging
   user=cookies.getCookie(AUTH_STR);//decorateWithIsloggedIn
  if(user !== "" ) {
    console.log("starting application" +user);
    startApp();
  } else {
  //console.log("login " +user);
    startLoggin();
  }
});

