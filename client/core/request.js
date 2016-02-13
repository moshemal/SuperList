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


/**********************     WINDOWS APPLICATION  ***************************************/	
	//var i =0;
/*adding new task give the server his DB the only time the server will response with error its only when the*/

	function addNewTask(name){
    return $.ajax("/api/addNewTask", {
				method: "post",
				  success: function(data, a, xhr){
      },
	  //sending to the server
	data:{ 
       name: 		name,
        num: ''
       //task: []//JSON.stringify(properties,null,2)
	}
		});
  }
  
  
  function editList(oldName, newName){
		return $.ajax("/api/editList",  { 
			method: "post",
			success: function(data, a, xhr){//
            console.log(data)			
			},	
			data: {
				oldName : 	oldName,
				 newName:  newName
			}	
		});
	} //end login
  
 
   function removeList(name){
		return $.ajax("/api/removeList",  { 
			method: "post",
			success: function(data, a, xhr){//
            console.log(data)			
			},	
			data: {
				name : 	name
			}	
		});
	} //end login
 
  

//public  
return {
isLoggedIn : isLoggedIn,
	login:      login,
	createUser: createUser,
	getAllLists : getAllLists,  //return get all list in the right side
    upload: upload,
    addNewTask: addNewTask, //adding new task 
	editList : editList, //
	removeList : removeList,
	getAllItems : getAllItems
	}
});