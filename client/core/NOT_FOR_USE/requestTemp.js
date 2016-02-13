define(['jquery'], function($){
	'use strict';

	
/**********************     SUBMIT  *********************************************/
	 function isLoggedIn(){
	 console.log("this is request all list");
     return $.ajax("/api/isLoggedIn",{
	 method :"get" //, //,
	 // success: function(data, a, xhr){console.log(data)}
	 });		
		}
			
	function login(name, password){
		return $.ajax("/api/login",  { 
			method: "post",
			success: function(data, a, xhr){//	
			},	
			data: {
				user: 		name,
				password: password
			}	
		});
	} //end login

	
  

/**********************   LEFT SIDE   VIEW APPLICATION   **************************/  
  function getAllLists(){
  console.log("this is request all list");
     return $.ajax("/api/getAllLists",{
	 method :"get" //, //,
	 // success: function(data, a, xhr){console.log(data)}
	 });
  } 
 

/**********************************************************************************/
/**********************  MIDDLE SIDE   VIEW APPLICATION   ************************/
/*********************************************************************************/	
function getAllItems(name){
	//console.log("hello from r");
        return $.ajax("/api/getAllItems", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                name : name
            }
        });
    } 


//public  
return {
isLoggedIn : isLoggedIn,
	login:      login,
	getAllLists : getAllLists,  //return get all list in the right side
	getAllItems : getAllItems
	}
});