var requestHandlers = require("./requestHandlers");
var auth 						= require("./auth");
var cookies					= require("./cookies");
var db							= require('./db');

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
    var cks = cookies.parseCookies(request);
    if (auth.isLoggedIn(cks)){
        response.writeHead(200, {"Content-Type": "text/plain"});
    }else{
        response.writeHead(401, {"Content-Type": "text/plain"});
    }
    response.end();
}

var handle = {
	"/isLoggedIn": 	isLoggedIn,
	"/login": 	    auth.login,
	//"/createUser":  requestHandlers.createUser,
	"/upload":      decorateWithIsloggedIn(requestHandlers.upload),

	"/getListView": decorateWithIsloggedIn(requestHandlers.getListView),
	"/addList":     decorateWithIsloggedIn(requestHandlers.addList),
	"/editList":    decorateWithIsloggedIn(requestHandlers.editList),
	"/removeList":  decorateWithIsloggedIn(requestHandlers.removeList),

	"/getItems":  decorateWithIsloggedIn(requestHandlers.getItems),
	"/getItem":  decorateWithIsloggedIn(requestHandlers.getItem),
	"/addItem":  decorateWithIsloggedIn(requestHandlers.addItem),
	"/editItem":  decorateWithIsloggedIn(requestHandlers.editItem),
	"/removeItem":  decorateWithIsloggedIn(requestHandlers.removeItem)
};


exports.handle = handle;