define(['jquery'], function($){
	
	'use strict';

	
	//we will get back from server/auth.js/function login
	//line 61 response.write(AUTH_KEY + "=" + token);	
	function login(name, password){
		return $.ajax("/api/login",  { 
			method: "post",
			success: function(data, a, xhr){
			alert("line 12 in request "+ data);
				console.log(xhr);	
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
        properties: JSON.stringify(properties || {})//JSON.stringify(properties,null,2)
      }
    });
  }
  
	
  
  


function upload(user){
$.get("/api/upload", function( data ) {
  $( "#taskList" ).html( data );
  alert( "Load was performed." );
});

	}
	
	function example()
{
    var response = "";
    var form_data = {
        username: username,
        password: password
    };
    $.ajax({
        type: "POST", 
        url: base_url + "ajax.php?test/json", 
        data: form_data,
        success: function(response)
        {
            /*response = '[{"Language":"jQuery","ID":"1"},{"Language":"C#","ID":"2"},
                           {"Language":"PHP","ID":"3"},{"Language":"Java","ID":"4"},
                           {"Language":"Python","ID":"5"},{"Language":"Perl","ID":"6"},
                           {"Language":"C++","ID":"7"},{"Language":"ASP","ID":"8"},
                           {"Language":"Ruby","ID":"9"}]'*/
            console.log(response);
            
	    var json_obj = $.parseJSON(response);//parse JSON
            
            var output="<ul>";
            for (var i in json_obj) 
            {
                output+="<li>" + json_obj[i].Language + ",  " + json_obj[i].ID + "</li>";
            }
            output+="</ul>";
            
            $('span').html(output);
        },
        dataType: "json"//set to JSON    
    })    
}
	
	
   
	return {
		login:      login,
		//createUser: createUser,
    upload: upload
	//list : list
	//addNewTask: addNewTask
	//listView : listView 
	}
});