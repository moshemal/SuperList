var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


//i have problom with the cookies
function decorateWithIsloggedIn(func){
return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);
		if (auth.isLoggedIn(cks)){
			func(response, parsedUrl, postData, request,auth.getLoggedIn(cks));
		} else {
			response.writeHead(401, {
				"Content-Type": "text/plain"
			});
			response.end();
		}		
	}
}

function isLoggedIn(response, parsedUrl, postData, request){
console.log("welcome to decorateWithIsloggedIn line 23 in apiRouter.js");
	var cks = cookies.parseCookies(request);
    if (auth.isLoggedIn(cks)){
        response.writeHead(200, {"Content-Type": "text/plain"});
    }
	else{
	console.log("in line 29 apiRouters ");//parsedUrl=Objecet
        response.writeHead(401, {"Content-Type": "text/plain"});
    }
    response.end();
}



var handle = {
     "/isLoggedIn" : isLoggedIn,
	"/login": 			auth.login,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)//will be called before we even get to main.js decorateWithIsloggedIn
   
}


exports.handle = handle;





