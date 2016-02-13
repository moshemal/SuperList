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
                console.log(data)
            },
            data: {
                user: 		name,
                password: password
            }
        });
    }

   

	return {
        isLoggedIn:  isLoggedIn,
		login:       login
        
	}
});