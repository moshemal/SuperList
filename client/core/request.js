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
	}

  function createUser (name, password, properties){
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