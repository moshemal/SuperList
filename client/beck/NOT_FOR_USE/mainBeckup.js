
/**
 * Created by galibr.
 */

define(['jquery', 
'modules/submit/Login/Login', 
'core/cookies',
 'core/layout',
  'core/NOT_FOR_USE/request',
 'modules/left/list_edit/List/List',
 'modules/middle/itemsList/ItemB'],
  function($, Login, cookies, layout,request,ListView,ItemB){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth",
	 login,
	 //create,
	 user = null,
	
	 list , //for list in the right panel 
	 arrayBtnHtml, //array list of button edit
	 
	 tab;

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
	login.getPromise().then(loginSuccess, loginFail);//  
  }//end of login
 

 /*########################################################################################################
  #################################  APPLICATION STRUCTION LEFT SIDE#######################################
  ########################################################################################################*/

  /**have a delay from taking the DB**/ 
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
 
 
 
  

  
/*########################################################################################################
#################################  APPLICATION STRUCTION MIDDLE SIDE #####################################
########################################################################################################*/
 
 /**
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
  **/
  
  function startMiddle(){
  function tabSuccess(){
	  console.log("tab:: tab success.");
     continueApp(); 
	  }//end Success
	  
	  //NOT FINISH MUST COME BACK
	 function tabFail(){
      console.log("tab fail trying again");
    }//end Fail
	 
	 tab = new ItemB(); 
	 tab.getPromise().then(tabSuccess,tabFail);
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
  
   
    //startListView(); // i have a delay because i did to it a structure I resolve it's with setTimOut 
  
  }//end startApp

  
  function continueApp(){
   //console.log("check in main 8 :: hello from continueApp");
   
   /**LIST of buttons in LIST view**/  
  list.$.find(".listsOfView  button").on('click',function(e){
	  console.log("check in main 8.1 :: .listsOfView  button " +name);
  var name= $(e.target).closest(".listsOfView").find(".name").html(); 
   startEdtOrRemWin(name);
  });
 
  
   /*LIST of buttons in LIST view*/   
  list.$.find(".listsOfView ").on('click',function(e){
	//console.log("hello");  
  var name= $(e.target).closest(".listsOfView").find(".name").html(); 
 console.log("check in main 8.2 :: only in target .listsOfView  "+name);
 startMiddleItems(name);
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
  
//});


 
 /**
   user=cookies.getCookie(AUTH_STR);//
  if(user !== "" ) {
  bool = 1;
    console.log("starting application" +user);
    startApp();
  } else {
    startLoggin();
  }
  **/
});

