/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies',
 'core/layout','modules/Create/Create','core/request',
 'modules/ButtonPlus/BtnAdd','modules/Window/WinForm','modules/List/List'],
  function($, Login, cookies, layout,Create,request,BtnAdd,WinForm,ListView){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth";
	var login;
	var create;
	var user = null;
	var btn; //for button plus
    var win; //for window task
	var list ; //for list in the right panel 
	
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
	login.$.find("#createbtn").on('click', function(){startCreate();});//
    
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
  
  
   //for create a window add new task
  function startWin(){
  function winSuccess(){
		console.log("NEW TASK success."); 
		//$('#taskList').empty();//if we do append instead of "by id inner" its will not clean the first
		//request.upload(); //have the new list
		list.getListView(list); //the new list view instead of using in the request
		
		win.closeWin(); //and close the window
	  }
	  
	 function winFail(){
      console.log("NEW TASK fail trying again");
      win.resetDeferred(); //like we do in Craete and Login
      win.getPromise().then(winSuccess, winFail); //try agin to have a new task
    }
	 
	 win = new WinForm(); //create a new window
	 win.openWin(); // i spearate that 
	 
	 //if im only want to close inside the window without any action so close
	  win.$.find(".close-button").on('click', function(){win.closeWin();});
	  win.getPromise().then(winSuccess,winFail);  
	  }
  
  
  
  
 
  function NameOfTheUser(){
  document.getElementById("middle").innerHTML =
"<h1>Hello <b>"+user+"</b><\h1>"
  }
  
  var bool = 0;
  
  function startApp(){
    layout.createLayout("3W", "#container");
	
	
	if(bool !== 1){
	user=cookies.getCookie('user');
	
	
	}
	//user=cookies.getCookie('user');
	NameOfTheUser(); //for checking
	console.log("starting application " +user); //for checking
	
   //create class for list
	list = new ListView();
	list.appendTo("#taskList");
	list.getListView(list);
	
	
	
	
	//create class Button
	btn = new BtnAdd(); 
	btn.appendTo("#task");//append to the button
	btn.$.find(".open-button").on('click', function(){startWin();});//if we have event click go to startWin();
    //menu.createMenu("panelBar", "#megaStore");
  }

  
   user=cookies.getCookie(AUTH_STR);//
  if(user !== "" ) {
  bool = 1;
    console.log("starting application" +user);
    startApp();
  } else {
    startLoggin();
  }
});

