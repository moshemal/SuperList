var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');


//i have problom with the cookies
function decorateWithIsloggedIn(func){
console.log("welcome to decorateWithIsloggedIn line 9 in apiRouter.js");
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


function isLoggedIn(response, parsedUrl, postData, request){
console.log("welcome to decorateWithIsloggedIn line 29 in apiRouter.js");
	var cks = cookies.parseCookies(request);
    if (auth.isLoggedIn(cks)){
        response.writeHead(200, {"Content-Type": "text/plain"});
    }
	else{
	console.log("in line 34 apiRouters ");//parsedUrl=Objecet
        response.writeHead(401, {"Content-Type": "text/plain"});
    }
    response.end();
}



var handle = {
     "/isLoggedIn" : isLoggedIn,
	"/login": 			auth.login,
	"/createUser":  requestHandlers.createUser,
	"/getAllLists": decorateWithIsloggedIn(requestHandlers.getAllLists), //decorateWithIsloggedIn will be called before we even get to main.js decorateWithIsloggedIn
	"/addNewTask" :  decorateWithIsloggedIn(requestHandlers.addNewTask), //will be called before we even get to main.js decorateWithIsloggedIn
	 "/editList" : decorateWithIsloggedIn(requestHandlers.editList),
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload)//will be called before we even get to main.js decorateWithIsloggedIn
   
}


exports.handle = handle;




