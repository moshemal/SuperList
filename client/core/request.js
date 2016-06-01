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

	 function  getAllListsView(){
        return $.ajax("/api/getAllListsView", {
            method: "get"
        });
    }
   
   function addList(name){
    return $.ajax("/api/addList", {
				method: "post",
				  success: function(data, a, xhr){
      },
	  //sending to the server
	data:{ 
       listName: 		listName
	}
		});
  }
   
   
   
   
   
   
   function getAllItems(listName){
     return $.ajax("/api/getAllItems",{
	 method :"post" ,
	 success: function(data, a, xhr){
		 console.log(data)
		 },
		data: {
			listName : listName
		} 
	 });
  } 
   

	return {
        isLoggedIn:  isLoggedIn,
		login:       login ,
		
		getAllListsView : getAllListsView,
		addList : addList ,
		
		getAllItems : getAllItems
        
	}
});