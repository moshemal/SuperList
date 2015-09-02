define(['jquery'], function($){
	
	'use strict';

	function login(name, password){
		return $.ajax("/api/login", {
			method: "post",
			
			//var a- bool value that if we suceed of login will print success
			//var xhr - an object
			//var data - print auth=0.05080643412657082 maybe take the data base from cookies.js
			success: function(data, a, xhr){
				console.log(data)	
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
        console.log(data)
      },
      data: {
        user: 		name,
        password: password,
        properties: JSON.stringify(properties,null,2)
      }
    });
  }
	return {
		login:      login,
    createUser: createUser
	}
});