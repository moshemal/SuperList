var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


function decorateWithIsloggedIn(func){
//console.log("welcome to decorateWithIsloggedIn line 8 in apiRouter.js");
	return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);//the function is in cookies.js Objecet of Login
		console.log("in line 11 apiRouters "+cks.user);//parsedUrl=Objecet
		if (auth.isLoggedIn(cks)){//the function is in auth.js
		console.log("in line 13 apiRouters "+cks.user);//parsedUrl=Objecet
			func(response, parsedUrl, postData, request);//go to upload
		} 
		else {
		console.log("in line 17 apiRouters ");//parsedUrl=Objecet
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
	"/addNewTask" :  requestHandlers.addNewTask,
	"/getAllLists":      decorateWithIsloggedIn(requestHandlers.getAllLists),
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)

}


exports.handle = handle;




