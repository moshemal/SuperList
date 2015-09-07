var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
	return function (response, parsedUrl, postData, request){
	
		var cks = cookies.parseCookies(request);
		if (auth.isLoggedIn(cks)){
			func(response, parsedUrl, postData, request);
			//console.log(parsedUrl);
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
	"/list": 			auth.list,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)
}


exports.handle = handle;