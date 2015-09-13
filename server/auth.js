var fs 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var properitess = {};
var userName=null;
var sessions 	= {};
var AUTH_KEY 	= "auth";
//var userName ;

fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file auth line 14: ' + err);
		return;
	}
	passwords = JSON.parse(data);
});


function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}


function propertiesFS(){
//console.log("welcome to propertiesFS line 27 in auth.js");
fs.readFile('db/'+ userName +'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 29: ' + err);
		return;
	}
	properitess = data;//JSON.parse(data);
	console.log('auth line 34: ' + properitess );
	});
}
	

	function getPropertiesFS(){
//console.log("welcome to getPropertiesFS line 40 in auth.js");
propertiesFS();
console.log('auth line 42: ' + properitess);
return properitess;
}
	


function login(response, parsedUrl, postData){
	console.log("welcome to login 42 in auth.js "+postData);
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;
		sessions[parsedData.user] = "" + token;
		//here the data base
		userName = parsedData.user; 
		propertiesFS(); //for me an help function 
		
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write(AUTH_KEY + "=" + token);	
		//response.write("nnn" + properites.full);	
	} 
	else {
		response.writeHead(401, {
			"Content-Type": "text/plain"
		});	
	}
	response.end();
}

function isLoggedIn (cookies){
//console.log("welcome to isLoggedIn line 70 in auth.js");
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	return (token && user && sessions[user] == token); 
}


function createUser(user, password){
//console.log("auth.js line 87  "+typeof user + " vlaue "+user);
//console.log("auth.js line 88  "+typeof password + " vlaue "+password);
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}



function addNewTask(task){
console.log("auth.js line 100  "+typeof user + " vlaue "+task);
//console.log("auth.js line 88  "+typeof password + " vlaue "+password);
	if (task===""){
	console.log("empty list in line 103 auth.js");
		return false;
	}
	fs.writeFile('db/'+ userName +'/lists/list.json', task, 'utf8');
	return true;
}



exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
exports.getPropertiesFS = getPropertiesFS ;
exports.createUser 	= createUser;
exports.addNewTask 	= addNewTask;