/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies', 'core/layout', 
'modules/Create/Create','core/menu','core/windowcreate','modules/ListView/ListView','core/list' ], 
  function($, Login, cookies, layout, Create, menu, window,ListView){
  'use strict';
  //global vars
  var AUTH_STR = "auth";
	var login;
	var create;
	var user;
	var list;
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
  
  //for sign in new User
  function startCreate(){
  
	  function createSuccess(){
		console.log("creation success moving to login.");
		startLoggin();
		create.destroy();
	  }
	  
	  
	  function createFail(){
      console.log("creation fail trying again");
      create.resetDeferred();
      create.getPromise().then(createSuccess, createFail);
    }
	
	
	create = new Create();
	create.appendTo("#container");
	login.destroy();
	create.getPromise().then(createSuccess,createFail);
  } //end of start Create
  
  
  function startApp(){
    layout.createLayout("3W", "#container");
	list=new ListView();
	
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

