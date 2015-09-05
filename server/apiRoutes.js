var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
	return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);//the function is in cookies.js Objecet of Login
		if (auth.isLoggedIn(cks)){//the function is in auth.js
		//console.log("in line 11 apiRouters "+cks.user);//parsedUrl=Objecet
		 postData = auth.getPropertiesJson(cks.user);
		 console.log("in line 13 apiRouters "+postData);//parsedUrl=Objecet
			func(response, parsedUrl, postData, request);
		} 
		else {
			response.writeHead(401, {
				"Content-Type": "text/plain"
			});
			response.end();
		}		
	}
}
//the call is from router.js
var handle = {
	"/login": 			auth.login, //auth.js line 24
	"/createUser":  requestHandlers.createUser, //requestHandlers.js line 22
	//requestHandlers.js line 6 and then go to function  decorateWithIsloggedIn line 7
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload) 
	
}


exports.handle = handle;