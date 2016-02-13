/**
 * Created by galibr.
 */

define(['jquery', 
'modules/submit/Login/Login', 
'core/cookies',
 'core/layout',
  'core/request',
 'modules/middle/itemsList/ItemB',
 ],
  function($, Login, cookies, layout,request,ItemB){
  'use strict';
  
  //global vars
    var AUTH_STR = "auth",
	 login,
	 user = null,
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
	
 
  }//end startApp

  
  function continueApp(){
   //console.log("check in main 8 :: hello from continueApp");
   
   
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
 
 
 
});

