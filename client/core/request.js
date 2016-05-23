define(['jquery'], function($){
	
	'use strict';

    function isLoggedIn(){
        return $.ajax("/api/isLoggedIn", {
            method: "get"
        });
    }

    function login(name, password){
        return $.ajax("/api/login", {
            method: "post",
            success: function(data, a, xhr){
                console.log("in function login: ",data)
            },
            data: {
                user: 		name,
                password: password
            }
        });
    }

   
   function getAllListsView(){
  console.log("this is request all list");
     return $.ajax("/api/getAllListsView",{
	 method :"get" ,
	 //success: function(data, a, xhr){console.log(data)}//give type of Array[size of tasks] (array of objects)
	 });
  } 
    
	

	return {
        isLoggedIn:  isLoggedIn,
		login:       login ,
		
		getAllListsView : getAllListsView
		
		//getAllItems : getAllItems
        
	}
});