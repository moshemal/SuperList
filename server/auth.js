var fs 						= require('fs');
//var fs2 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var properites = null;
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


function propertiesFS(user){
console.log("welcome to propertiesFS line 27 in auth.js");
fs.readFile('db/'+userName+'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 29: ' + err);
		return;
	}
	properites = JSON.parse(data);
	//console.log('auth line 34: ' + properites.full);
	});
}
	

	function getPropertiesFS(){
console.log("welcome to getPropertiesFS line 40 in auth.js");
return properites;
}
	


function login(response, parsedUrl, postData){
	console.log("welcome to login 42 in auth.js "+postData);
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
	//userName = parsedData.user;
	//propertiesFS();
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;
		sessions[parsedData.user] = "" + token;
			//here the data base
		userName = parsedData.user; 
		propertiesFS(userName);
		//readPropertiesJson();
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
console.log("welcome to isLoggedIn line 70 in auth.js");
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

/**
function show(response, parsedUrl, postData){
	var parsedQuery = querystring.parse(postData);
  //if (validateCreateUserParams(parsedQuery)){//line 15
   // if (auth.createUser(parsedQuery.user, parsedQuery.password)){//auth.js line 80
      db.createUser(parsedQuery.user, parsedQuery.properties); //to the make dir.js 
      response.writeHead(200, {"Content-Type": "text/plain"});
	 // console.log("in line 28 request handler = " + parsedQuery.properties);
      response.write(properites);
      response.end();
      return;
    }
  }
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to show list");
  response.end();
}
}
**/


exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
// exports.list 	= list;
  exports.getPropertiesFS = getPropertiesFS ;
//exports.createUser 	= createUser;