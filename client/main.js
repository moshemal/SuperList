/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies',
 'core/layout','modules/Create/Create','core/windowcreate','core/request','core/TaskList/NewTask','core/menu'],
  function($, Login, cookies, layout,Create,window,request,NewTask,menu){
  'use strict';
  //global vars
  var AUTH_STR = "auth";
	var login;
	var create;
	var user = null;
	var lst;

	
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
	  
	  }
  
  /*for task lisr maybe if i have time create something like "startLoggin()" "startCreate()" */
  function startTaskList(){
  function listSuccess(){
		console.log("List success moving to login.");
		//startLoggin();
		//create.destroy();
		request.upload();//not good must be fixed
	  }
	  
	   function listFail(){
      console.log("List fail trying again");
	  request.upload();//not good must be fixed
      //create.resetDeferred();
      //create.getPromise().then(createSuccess, createFail);
    }
  lst= new NewTask();
  lst.appendTo("#taskList");
  lst.getPromise().then(listSuccess,listFail);  
  }
  
  function NameOfTheUser(){
  document.getElementById("middle").innerHTML =
"<h1>Hello <b>"+user+"</b><\h1>"
  
  }
  
  
  
  function startApp(){
    layout.createLayout("3W", "#container");
	user=cookies.getCookie('user');
	NameOfTheUser();
	console.log("starting application " +user);
	//startTaskList();
	window.createButton("buttonPlus", "#windowButton");
	request.upload();	
    menu.createMenu("panelBar", "#megaStore");
	
  }

  
   user=cookies.getCookie(AUTH_STR);//decorateWithIsloggedIn
  if(user !== "" ) {
    console.log("starting application" +user);
    startApp();
  } else {
  //console.log("login " +user);
    startLoggin();
  }
});

