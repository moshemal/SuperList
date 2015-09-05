var fs 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var propertiesOfUser = null;//after we have login or still i will read the db of user/properties.json
var sessions 	= {};
var AUTH_KEY 	= "auth";

fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file: ' + err);
		return;
	}
	//console.log("im am in server [auth.js] line 13 read file");
	passwords = JSON.parse(data);//txt	
	//console.log("im am in server [auth.js] line 13 read file= "+data);
});

function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}

function readPropertiesJson(userNameFile){
fs.readFile('./db/' + userNameFile + '/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file: ' + err);
		return;
	}
	
	propertiesOfUser = JSON.parse(data);//tx
	//console.log("im am in server [auth.js] line 30 read file= "+data);
});
}


function getPropertiesJson(userNameFile){
readPropertiesJson(userNameFile);
return propertiesOfUser;
}




function login(response, parsedUrl, postData){
	var parsedData = querystring.parse(postData);
	console.log('in auth.js login line 31 = ' + parsedData.user);
	
	if (isRegistered(parsedData.user, parsedData.password)){
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60/* *24*4 */); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;
		
		//here the data base
		readPropertiesJson(parsedData.user);
		
		
		sessions[parsedData.user] = "" + token;
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		//console.log("in line 60 = "+AUTH_KEY + "=" + token)
		response.write(AUTH_KEY + "=" + token);	//will return to client side client/request.js
		//response.write(propertiesOfUser);
	} 
	
	else {
		response.writeHead(401, {
			"Content-Type": "text/plain"
		});	
	}
	response.end();
}

function isLoggedIn (cookies){
    //console.log("im am in server [auth.js] line 49 isLoggedIn");
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	return (token && user && sessions[user] == token); 
}

function createUser(user, password){
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}

exports.getPropertiesJson = getPropertiesJson;
exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn; 
exports.createUser 	= createUser;