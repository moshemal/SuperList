define(['jquery'], function($){
	
	'use strict';

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
	} //end login

  function createUser (name, password, properties){
   console.log("in client/request.js create user name :: "+name);
   console.log("in client/request.js create user password :: "+password);
    return $.ajax("/api/createUser", {
      method: "post",
      success: function(data, a, xhr){
        console.log(data)
      },
      data: {
        user: 		name,
        password: password,
        properties: JSON.stringify(properties || {})
      }
    });
  }
	return {
		login:      login,
    createUser: createUser
	}
});