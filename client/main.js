/**
 * Created by moshemal.
 */

define(['jquery', 'modules/submit/Login/Login', 'core/cookies',
 'core/layout','modules/submit/Create/Create','core/request',
 'modules/addList/ButtonPlus/BtnAdd','modules/addList/Window/WinForm',
 'modules/list_edit/List/List','modules/list_edit/EditOrRemoveWindow/EditOrRemForm'],
  function($, Login, cookies, layout,Create,request,BtnAdd,WinForm,ListView,EditOrRemForm){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth";
	var login;
	var create;
	var user = null;
	var btn; //for button plus
    var win; //for window task
	var list ; //for list in the right panel 
	var arrayBtnHtml; //array list of button edit
	var edit ; //for rename or remove element from the list
	
  function startLoggin(){
	function loginSuccess(){
      //console.log("login success moving to application gali: was here.");  
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
		console.log("NEW TASK window success.");
		list.getListView(list); //the new list view instead of using in the request
		/*
		if I don't set time out it's first go to close win and continue
		up but will not update and then if I don't do refresh the 
		button of the list edit not work
		*/ 
		setTimeout(function(){
	    console.log("set time for buttons LIST EDIT to actually work");//after we finish with getListView
		win.closeWin(); //and close the window
		continueApp(); //and continue app (maybe not ne)
        },60); //time out for 0.06 second maybe less 
	  }//end winSuccess
	  
	 function winFail(){
      console.log("NEW TASK window fail trying again");
      win.resetDeferred(); //like we do in Create and Login it's can only fail if we don't input nothing empty 
      win.getPromise().then(winSuccess, winFail); //try again to have a new task
    }	 
	 win = new WinForm(); //create a new window
	  win.openWin(); // I was sperate that 
	  
	 //if im only want to close inside the window without any action so close
	  win.$.find("#close").on('click', function(){win.closeWin();});
	  win.getPromise().then(winSuccess,winFail);
	  //win.$.find("#addtask #close").on('click',function(e){
	  //$(e.target).closest("").find("");
	 // });
	  }
  
  
  //have a delay from taking the DB 
  function startListView(){
   function listViewSuccess(){
	  console.log("list View success.");
      arrayBtnHtml =list.getArrayOfButtons();
	  console.log("in start",list.$);
     continueApp(); //for the button edit list  event
	  }
	  
	 function listViewFail(){
      console.log("list View fail trying again");
    }
	 
	 list = new ListView(); //create a new listView
	 list.getPromise().then(listViewSuccess,listViewFail);
	  }
  
  //a window from the icon button in the list of the user EDIT OR REMOVE
  function startEdtOrRemWin(){
  function editOrRemSuccess(){
		console.log("EDIT or remove success.");
        continueApp();		
	  } 
  function editOrRemFail(){
      console.log("Edit or Remove fail trying again");
    
    }
	 console.log("EDITTTTT List");
	 edit = new EditOrRemForm(); //create a new window for the select task
	 edit.openWin(); // i spearate that 	 
	 //if i'm only want to close inside the window without any action so close
	  //edit.$.find(".close-button").on('click', function(){edit.closeWin();});
	  edit.getPromise().then(editOrRemSuccess,editOrRemFail);  	 
  }//end edit
  
  
  function NameOfTheUser(){
  document.getElementById("middle").innerHTML =
"<h1>Hello <b>"+user+"</b><\h1>"
  }
  
  var bool = 0;
  var i =0;
  function startApp(){
  console.log("hello from start App");
    layout.createLayout("3W", "#container");
	//if(bool !== 1){
	user=cookies.getCookie('user');
	console.log(user);
	//}
	//user=cookies.getCookie('user');
	NameOfTheUser(); //for checking
	//console.log("starting application " +user); //for checking
  
  
  startListView(); // i have a delay because i did to it a structure I resolve it's with setTimOut 
  
	btn = new BtnAdd();//create class Button 
	btn.appendTo("#task");//append to the button
	btn.$.find(".open-button").on('click', function(){console.log("in start app "+i++);startWin();});//if we have event click go to startWin();
  }//end startApp

  
  function continueApp(){
   console.log("hello from continueApp");
 
 //LIST of buttons in LIST view   
  list.$.find(".listsOfView  button").on('click',function(e){
  console.log("tar ",e.target);
 //var name= $(e.target).closest(".listsOfView").find(".name").html(); var btn = $(e.target).closest(".listsOfView").find("button").html();
  //console.log(name);
   startEdtOrRemWin();
  });
  }//end  continueApp
  
 
 request.isLoggedIn().then(
 function(){
 console.log("sucess COOKIES");
 startApp();
 },
 function(){
 console.log("failed COOKIES");
 startLoggin();
 });
 
 
 
   //user=cookies.getCookie(AUTH_STR);//
  //if(user !== "" ) {
  //bool = 1;
   // console.log("starting application" ,user);
   // startApp();
  //} else {
    //startLoggin();
  //}
  
});

