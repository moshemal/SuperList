var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');



function decorateWithIsloggedIn(func){
return function (response, parsedUrl, postData, request){
		var cks = cookies.parseCookies(request);//i have problom with the cookies
		console.log("welcome to decorateWithIsloggedIn line 11 in apiRouter.js\n");
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
	var cks = cookies.parseCookies(request);
    console.log("welcome to isLoggedIn line 25 in apiRouter.js\n");
	if (auth.isLoggedIn(cks)){
		console.log("in line 27 function isLoggedIn in apiRouters.js \n ");
        response.writeHead(200, {
			"Content-Type": "text/plain"
			});
    }else{
	console.log("in line 32 function isLoggedIn in apiRouters.js \n ");//parsedUrl=Objecet
        response.writeHead(401, {
			"Content-Type": "text/plain"
			});		
    }
    response.end();
}



var handle = {
     "/isLoggedIn" : isLoggedIn,
	"/login": 			auth.login,
	//"/upload":      decorateWithIsloggedIn(requestHandlers.upload),//will be called before we even get to main.js decorateWithIsloggedIn
   
   "/getAllListsView" : decorateWithIsloggedIn(requestHandlers.getAllListsView), //left side  list view
   "/addList" : decorateWithIsloggedIn(requestHandlers.addList),
   "/editList" : decorateWithIsloggedIn(requestHandlers.editList),
   "/removeList" : decorateWithIsloggedIn(requestHandlers.removeList),
 
   
   "/getAllItems" : decorateWithIsloggedIn(requestHandlers.getAllItems) //middle side  tabStrip+ listView
   
}


exports.handle = handle;





