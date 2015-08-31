var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
	return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);//the function is in cookies.js
		if (auth.isLoggedIn(cks)){////the function is in auth.js
			func(response, parsedUrl, postData, request);
		} else {
			response.writeHead(401, {
				"Content-Type": "text/plain"
			});
			response.end();
		}		
	}
}

var handle = {
	"/login": 			auth.login,
	"/createUser":  requestHandlers.createUser,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)
}


exports.handle = handle;