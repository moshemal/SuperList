/**
 * Created by galibr.
 */

define(['jquery', 
'modules/Login/Login', 
'core/cookies',
 'core/layout', 
 'modules/left/Button/BtnAdd','modules/left/Window/Window',
  'core/request'
 ],
  function($, Login, cookies, layout,BtnAdd,Window,request){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth",
	 login,
	 btnPlus,
	 winAdd,
	 //create,
	 user = null;


/*If the cookies is expierd do start login*/	
  function startLoggin(){
	function loginSuccess(){
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
  }//
 
/**********************************************************************************************/
/************************** WINDOW OF NEW TASK *************************************************/  
/**********************************************************************************************/  	
  function winAddTask(){
	function addTaskSuccess(){
      continueApp(); //
      
    }
	
    function addTaskFail(){
		console.log("win Add Task fail trying again");		
    }
    
	winAdd = new Window();//
    
	winAdd.getPromise().then(addTaskSuccess, addTaskFail);//  
  }//
 
 
 
 
 
    
/**********************************************************************************************/
/************************** APPLICATION START *************************************************/  
/**********************************************************************************************/  
  function startApp(){  
    layout.createLayout("3W", "#container"); //create layout
	
	//create btn plus left side in buttom
	btnPlus = new BtnAdd();
	btnPlus.appendTo("#task");
	btnPlus.$.find("#buttonWin").on('click', function(){
		console.log("hello world");
		winAddTask();
		});//event click go to winAddTask()
	
	
	
  }//end startApp

  var i =0;
  function continueApp(){
	console.log("hello world "+i++);    
  }
  
  
  
  
  
 request.isLoggedIn().then(function() {startApp();},function(){startLoggin();});
 
 
 
  
});

