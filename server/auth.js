var fs 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var sessions 	= {};
var AUTH_KEY 	= "auth";

fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file: ' + err);
		return;
	}
	passwords = JSON.parse(data);
});

function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}


function login(response, parsedUrl, postData){
	
	var parsedData = querystring.parse(postData);//

	if (isRegistered(parsedData.user, parsedData.password)){
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*2); //2 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;
		sessions[parsedData.user] = "" + token;
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write(AUTH_KEY + "=" + token);	
	} else {
		response.writeHead(401, {
			"Content-Type": "text/plain"
		});	
	}
	response.end();
}

function isLoggedIn (cookies){
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	//console.log("in line 47  function isLoggedIn in  auth.js",token);
	//console.log("in line 48  function isLoggedIn in  auth.js",user);
	return (token && user && sessions[user] == token); 
}

function getLoggedIn(cookies){
	conosle.log("line 53 function getLoggedIn in auth.js",cookies["user"]);
    return cookies["user"];
}

exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn; 
exports.getLoggedIn = getLoggedIn;