define(['jquery'], function($){
	
	'use strict';

    function isLoggedIn(){
        return $.ajax("/api/isLoggedIn", {
            method: "post"
        });
    }

    function login(name, password){
        return $.ajax("/api/login", {
            method: "post",
            success: function(data, a, xhr){
                console.log(data)
            },
            data: {
                user: 		name,
                password: password
            }
        });
    }

   
   function getAllLists(){
  console.log("this is request all list");
     return $.ajax("/api/getAllLists",{
	 method :"get" 
	 });
  } 
   
   

	return {
        isLoggedIn:  isLoggedIn,
		login:       login
        
	}
});