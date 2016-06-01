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
   
   function addList(listName){
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
   
   
   function editList(oldName, newName){
	    return $.ajax("/api/editList", {
				method: "post",
				  success: function(data, a, xhr){
					  console.log(data);
      },
	  //sending to the server
	data:{ 
       oldName : 		oldName,
	   newName : newName
	}
		});
	   
	   
   }
   
   
    function removeList(listName){
		 return $.ajax("/api/removeList", {
				method: "post",
				  success: function(data, a, xhr){
					  console.log(data);
      },
	  //sending to the server
	data:{ 
       listName : 		listName
	  
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
		editList : editList ,
		 removeList :  removeList,
		
		getAllItems : getAllItems
        
	}
});