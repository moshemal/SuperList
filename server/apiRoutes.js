var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
	return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);//the function is in cookies.js Objecet of Login
		if (auth.isLoggedIn(cks)){//the function is in auth.js
		//console.log("in line 11 apiRouters "+cks.user);//parsedUrl=Objecet
		 
		 //console.log("in line 13 apiRouters "+postData);//parsedUrl=Objecet
			func(response, parsedUrl, postData, request);//go to upload
		} 
		else {
			response.writeHead(401, {
				"Content-Type": "text/plain"
			});
			response.end();
		}		
	}
}

var handle = {
	"/login": 			auth.login,
	//"/createUser":  requestHandlers.createUser,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)
}


exports.handle = handle;