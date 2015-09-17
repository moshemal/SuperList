define(['jquery'], function($){
	
	'use strict';

	
	//we will get back from server/auth.js/function login
	//line 61 response.write(AUTH_KEY + "=" + token);	
	function login(name, password){
		return $.ajax("/api/login",  { 
			method: "post",
			success: function(data, a, xhr){
			//alert("line 12 in request "+ data);
				//console.log(xhr);	
			},	
			data: {
				user: 		name,
				password: password
			}
			
		});
	} //end login

	
	 function createUser (name, password, properties){
   //console.log("in client/request.js create user properties :: " +properties);
   
    return $.ajax("/api/createUser", {
      method: "post",
      success: function(data, a, xhr){
	  //alert("create line 30 request  "+data);
        console.log(data)
      },
      data: {
        user: 		name,
        password: password,
        properties: JSON.stringify(properties )//JSON.stringify(properties,null,2)
      }
    });
  }
  

function upload(){
$.get("/api/upload", function( data ) {
//alert(data);
//var inlineTemplate = kendo.template("Hello,  ProductName: #: ProductName # #= job #");
//var inlineData = "'"+data+"'";//{ firstName: "John", lastName: "Doe" };
var obj = JSON.parse(data);
console.log(typeof data);
document.getElementById("taskList").innerHTML =
"<h1>List Of Properties<\h1>"+
"<h2>"+obj[0].name +"</h2>"; 
});
}

		
  function addNewTask(name){
  return $.ajax("/api/addNewTask", {
				method: "post",
				  success: function(data, a, xhr){
	            alert("create line 61 request  "+data);
                  console.log(data)
      },
	data:{ //JSON.stringify(data)
       name: 		name,
        num: ''
       //task: []//JSON.stringify(properties,null,2)
	
	
	}

	
		});
  }
  
	  
	return {
		login:      login,
	createUser: createUser,
    upload: upload,
	//list : list
	addNewTask: addNewTask
	//listView : listView 
	}
});