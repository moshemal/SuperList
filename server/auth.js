var fs 						= require('fs');
//var fs2 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var properites = null;
var userName=null;
var sessions 	= {};
var AUTH_KEY 	= "auth";

fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file: ' + err);
		return;
	}
	passwords = JSON.parse(data);
});


function propertiesFS(){
fs.readFile('db/'+userName+'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 54: ' + err);
		return;
	}
	properites = JSON.parse(data);
	console.log('27: ' + properites);
	});
}
	
function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}


function login(response, parsedUrl, postData){
	//console.log(parsedUrl);
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
	userName = parsedData.user;
	propertiesFS();
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
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




function list(response, parsedUrl, postData){
	if (userName!==null){	
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		 var parsedData = querystring.parse(properites);
		 	console.log('69: ' + properites);
		response.write("hhh" +parsedData);	
	} else {
		response.writeHead(401, {
			"Content-Type": "text/plain"
		});	
	}
	response.end();
	

}


exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
 exports.list 	= list;
  exports.propertiesFS 	= propertiesFS;
//exports.createUser 	= createUser;