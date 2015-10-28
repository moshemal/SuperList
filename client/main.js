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
	var arrayBtnHtml; //array list of btn edit
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
    		console.log("before",list.$);
		list.getListView(list); //the new list view instead of using in the request
       //startListView();	
    console.log("after",list.$);
		//console.log("winSuccess lst",list);//list
		//arrayBtnHtml = list.getArrayOfButtons(); //i steal have a delay because of the resolve that in ListView getAll
		//console.log(listBtn.length);
		continueApp(); 	
		win.closeWin(); //and close the window
		
	  }
	  
	 function winFail(){
      console.log("NEW TASK window fail trying again");
      win.resetDeferred(); //like we do in Craete and Login
      win.getPromise().then(winSuccess, winFail); //try again to have a new task
    }	 
	 win = new WinForm(); //create a new window
	  win.openWin(); // i spearate that 
	  
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
     continueApp(); //fot the button list event
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
	  } 
  function editOrRemFail(){
      console.log("Edit or Remove fail trying again");
    
    }
	 console.log("EDITTTTT");
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
  
  
  startListView(); // i have a delay because i did to it a structure 
  //create class Button
	btn = new BtnAdd(); 
	//console.log(btn.$);
	btn.appendTo("#task");//append to the button
	btn.$.find(".open-button").on('click', function(){startWin();});//if we have event click go to startWin();
	//list view	 
  }//end startApp

  
  function continueApp(){
   console.log("hello from continueApp");
   //for list view
  list.$.find(".listsOfView  button").on('click',function(e){
  console.log("tar ",e.target);
// var name= $(e.target).closest(".listsOfView").find(".name").html();
 //var btn = $(e.target).closest(".listsOfView").find("button").html();
//  console.log(name);
   startEdtOrRemWin();
  //edit = new EditOrRemForm();
  //edit.openWin();
  //startEdtOrRemWin();
  });
  }//end  continueApp
  
 
 request.isLoggedIn().then(function(){
 console.log("sucess");
 startApp();
 },
 function(){
 console.log("failed");
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

