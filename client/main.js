/**
 * Created by galibr.
 */

define(['jquery', 
'modules/Login/Login', 
'core/cookies',
 'core/layout', 'modules/left/Button/BtnAdd',
  'core/request'
 ],
  function($, Login, cookies, layout,btn,request){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth",
	 login,
	 //create,
	 user = null;


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
 

 
    
/**********************************************************************************************/
/************************** APPLICATION START *************************************************/  
/**********************************************************************************************/  
 
  function startApp(){  
    layout.createLayout("3W", "#container"); //create layout
	btn.createBtnPlus("+","#task");
	
  
  }//end startApp

  
 request.isLoggedIn().then(function() {startApp();},function(){startLoggin();});
 
 
 
  
});

