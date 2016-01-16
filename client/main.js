/**
 * Created by galibr.
 */

define(['jquery', 
'modules/submit/Login/Login', 
'core/cookies',
 'core/layout',
 /*'modules/submit/Create/Create',*/ 'core/request',
 /*'modules/left/addList/ButtonPlus/BtnAdd','modules/left/addList/Window/WinForm',*/
 'modules/left/list_edit/List/List',
 'modules/middle/itemsList/ItemB',
 /*'modules/left/list_edit/EditOrRemoveWindow/EditOrRemForm'*/],
  function($, Login, cookies, layout,/*Create,*/request,/*BtnAdd,WinForm,*/ListView,ItemB /*,EditOrRemForm*/){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth",
	 login,
	 //create,
	 user = null,
	// btn, //for button plus
     //win, //for window task
	 list , //for list in the right panel 
	 arrayBtnHtml, //array list of button edit
	 //edit , //for rename or remove element from the list
	 tab;




/*########################################################################################################
  #################################  SUBMIT STRUCTION ####################################################
  ########################################################################################################*/	

/*If the cookies is expierd do start login*/	
  function startLoggin(){
	function loginSuccess(){
      //console.log("check in main 1 ::checking for me if login success");  
      startApp(); //go to function startApp and start the application
      login.destroy(); //delete page of login
    }
	
    function loginFail(){
		console.log("login fail trying again");
		login.resetDeferred();//
		login.getPromise().then(loginSuccess, loginFail);//like a while(FALSE) until you succeed of login
    }
    
	login = new Login();//from: modules/submit/Login/Login.js
    login.appendTo("#container");//
	//login.$.find("#createbtn").on('click', function(){startCreate();});//if we press the button of create: go to struction of create new user	
	login.getPromise().then(loginSuccess, loginFail);//  
  }//end of login
 
/**for sign in new User
  function startCreate(){
	  function createSuccess(){
		//console.log("check in main 2 :: creation success moving to login.");
		startLoggin();//and go to struction  startLogin
		create.destroy();//delete page create user
	  }
	  
	function createFail(){
      console.log("creation fail trying again");
      create.resetDeferred();
      create.getPromise().then(createSuccess, createFail);//like a while(FALSE) until you succeed of create
    }
	 
	  
	create = new Create(); //modules/submit/Create/Create.js
	create.appendTo("#container");//append 
	login.destroy();//destroy login page and go to sign up page (create user).
	create.getPromise().then(createSuccess,createFail);  
	  }//end startCreate
 **/

 /*########################################################################################################
  #################################  APPLICATION STRUCTION LEFT SIDE#######################################
  ########################################################################################################*/

  /*have a delay from taking the DB*/ 
  function startListView(){
   function listViewSuccess(){
	  console.log("check in main 3 :: list View success.");
      //arrayBtnHtml = list.getArrayOfButtons(); //for checking
	  //console.log("in start: ",list.$);
     continueApp(); //for the button edit list  event
	  }//end Success
	  
	  //NOT FINISH MUST COME BACK
	 function listViewFail(){
      console.log("list View fail trying again");
    }//end Fail
	 
	 list = new ListView(); //create a new listView from modules/list_edit/List/List.js
	 list.getPromise().then(listViewSuccess,listViewFail);
	  }//end startListView
 
 /*the user name for checking*/
  function NameOfTheUser(){
  document.getElementById("middle").innerHTML =
    "<h1>Hello <b>"+user+"</b><\h1>"
  }
  
/*########################################################################################################
  #################################  APPLICATION WINDOW STRUCTION LEFT SIDE ##############################
  ########################################################################################################*/

/**for create a window add New task
  function startWin(){
  function winSuccess(){
		//console.log("check in main 4.1 :: NEW TASK window success.");
		list.getListView(list);//the new list view instead of using in the request
		/**
		if I don't set time out it's first go to close win and continue
		up but will not update and then if I don't do refresh the 
		button of the "list edit" not work
		 
		setTimeout(function(){
	    //console.log("check in main 4.2 :: set time for buttons LIST EDIT to actually work");//after we finish with getListView
		win.closeWin(); //and close the window
		continueApp(); //and continue app (maybe not ne)
        },60); //time out for 0.06 second maybe less 
	  }//end winSuccess
	  
  function winFail(){
      //console.log("NEW TASK window fail trying again");
      win.resetDeferred(); //like we do in Create and Login it's can only fail if we don't input nothing empty 
      win.getPromise().then(winSuccess, winFail); //try again to have a new task
    }
	
	win = new WinForm(); //create a new window modules/addList/Window/WinForm.js
	win.openWin(); // I was sperate that 
	win.$.find("#close").on('click', function(){win.closeWin();});//if im only want to close inside the window without any action so close
	win.getPromise().then(winSuccess,winFail);
	  }//end startWin
    
//a window from the icon button in the list of the user EDIT OR REMOVE
  function startEdtOrRemWin(name){
	function editOrRemSuccess(){
		console.log("check in main 5 :: EDIT or remove success.");
		list.getListView(list);//the new list view instead of using in the request
		/**
		if I don't set time out it's first go to close win and continue
		up but will not update and then if I don't do refresh the 
		button of the "list edit" not work
		
		setTimeout(function(){
	    console.log("set time for buttons LIST EDIT to actually work");//after we finish with getListView
		edit.closeWin();//and close the window
	    //edit.destroy();
		continueApp(); //and continue app (maybe not ne)
        },60); //time out for 0.06 second maybe less 	
	  }//end
	  
    function editOrRemFail(){
      console.log("check in main 5 :: Edit or Remove fail trying again");
	   edit.resetDeferred(); //like we do in Create and Login it's can only fail if we don't input nothing empty 
	  edit.getPromise().then(editOrRemSuccess,editOrRemFail);  
    }//end
	
	//console.log("EDITTTTT List",name);
	edit = new EditOrRemForm(name); //new window for the select task modules/list_edit/EditOrRemoveWindow/EditOrRemForm.js 
	edit.openWin(); // i spearate that 
	edit.getPromise().then(editOrRemSuccess,editOrRemFail);  	 
  }//end startEdtOrRemWin
  **/
  
/*########################################################################################################
#################################  APPLICATION STRUCTION MIDDLE SIDE #####################################
########################################################################################################*/
 
 function startMiddleItems(name){
	 function middleTabStripSuccess(){
	  console.log("check in main 6 :: Tab Strip Success.");
     continueApp(); //for the button edit list  event
	  }//end Success
	  
	 function middleTabStripFail(){
      console.log("check in main 6 :: Tab Strip Fail trying again");
    }//end Fail
	 
	 tab = new ItemB(name); //create a new listView from modules/list_edit/List/List.js
	 tab.getPromise().then(middleTabStripSuccess,middleTabStripFail); 
 }
  
  
  
    
/**********************************************************************************************/
/************************** APPLICATION START *************************************************/  
/**********************************************************************************************/  
  var bool = 0;
  var i =0;
  function startApp(){  
	//console.log("check in main 7 :: hello from start App");
    layout.createLayout("3W", "#container"); //create layout
	//if(bool !== 1)
	user=cookies.getCookie('user');
	//console.log(user);
	//user=cookies.getCookie('user');
	//NameOfTheUser(); //for checking
	//console.log("starting application " +user); //for checking
  
   
    startListView(); // i have a delay because i did to it a structure I resolve it's with setTimOut 
  /**
	btn = new BtnAdd();//create class Button from: modules/addList/ButtonPlus/BtnAdd.js 
	btn.appendTo("#task");//append to the button
	btn.$.find(".open-button").on('click', function(){startWin();});//event click go to startWin()
  **/
  }//end startApp

  
  function continueApp(){
   //console.log("check in main 8 :: hello from continueApp");
   
   /**LIST of buttons in LIST view  
  list.$.find(".listsOfView  button").on('click',function(e){
	  console.log("check in main 8.1 :: .listsOfView  button " +name);
  var name= $(e.target).closest(".listsOfView").find(".name").html(); 
   startEdtOrRemWin(name);
  });
  **/
  
   /*LIST of buttons in LIST view*/   
  list.$.find(".listsOfView ").on('click',function(e){
	//console.log("hello");  
  var name= $(e.target).closest(".listsOfView").find(".name").html(); 
 console.log("check in main 8.2 :: only in target .listsOfView  "+name);
 startMiddleItems(name);
 //
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

