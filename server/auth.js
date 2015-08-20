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
	
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60/* *24*4 */); //4 days 
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
	return (token && user && sessions[user] == token); 
}

function createUser (user, password){
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}


exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn; 
exports.createUser 	= createUser;