define(['jquery'], function($){
	'use strict';

		
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
    return $.ajax("/api/createUser", {
      method: "post",
      success: function(data, a, xhr){console.log(data)},
      data: {
        user: 		name,
        password: password,
        properties: JSON.stringify(properties)//JSON.stringify(properties,null,2)
      }
    });//$.ajax
  }
  
  
  
  
/*if i will have more time i will think and do another
list for the mean while its what we have now i really start to understend the work*/
function upload(){
console.log("hello");
//Request "/api/upload" and will print the result of the request:
$.get("/api/upload",function(data){
console.log(typeof data);
var obj = JSON.parse(data);//make it a objecet

//if we have empty list return
if(obj.length===0){
document.getElementById("taskList").innerHTML =
"<h1>List Of Task<\h1>"+
"<h2>Empty List</h2>";
return; 
}

//print the list of the user
var text = "<ul>List Of Task  all: "+obj.length; 
for(var index = 0 ;index < obj.length ; index++){
text += "<li> "+obj[index].name +"     |      "+obj[index].num+"</li>"
}
text +="</ul>"

//document.getElementById("taskList").innerHTML =text;

//and append it to #taskList 
$("#taskList").append(text);
});//end of $.get
}

	var i =0;

	/*adding new task give the server his DB 
	the only time the server will response with error its only when the*/
  function addNewTask(name){
  return $.ajax("/api/addNewTask", {
				method: "post",
				  success: function(data, a, xhr){
	            //alert("create line 61 request  "+data);
                  console.log(data)
				  //console.log(++i);
      },
	  //sending to the server
	data:{ 
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
	addNewTask: addNewTask
	}
});