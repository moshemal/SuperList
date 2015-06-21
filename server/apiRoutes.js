var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
	return function (response, pathname, postData, request){
		var cks = cookies.parseCookies(request);
		if (auth.isLoggedIn(cks)){
			func(response, pathname, postData, request);
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
	"/createUser":  db.createUser,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)
}


exports.handle = handle;