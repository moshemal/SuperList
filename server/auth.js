var fs 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var i = 0;
var lists = [];
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
	//console.log(typeof data);
	//console.log(passwords);
	//console.log(typeof passwords);
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
	//console.log('auth line 33: ' + properitess );
	properitess = data;//JSON.parse(data);
	//console.log('auth line 35: ' +  properitess );
	});
}
	

	function getPropertiesFS(){
//console.log("welcome to getPropertiesFS line 40 in auth.js");
propertiesFS();
//console.log('auth line 42: ' + properitess);
return properitess;
}
	

	
	function listFS(){
//console.log("welcome to propertiesFS line 27 in auth.js");
fs.readFile('db/'+ userName +'/lists/list.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 56: ' + err);
		return;
	}
	//console.log('auth line 60: ' +typeof data);
	lists = JSON.parse(data);
	console.log("line 62 auth "+   ++i);
	//console.log("line 62 auth "+   lists[0].name);
	//console.log("line 62 auth "+   lists[1].name);
	});
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
		//console.log('auth line 61: ' + properitess);
		//console.log('auth line 62: ' + typeof null); //typeof null === object
		propertiesFS(); //for me an help function 
		
		listFS();//read list task
		/*
		//var name = "gali";
		//var num = i++;
		var task =[];
	    var item ={};
   item["name"] =name;		
	item["num"] =num;	
	item["task"] =task;	
		lists.push(item);
		fs.writeFile('db/'+ userName +'/lists/list.json',JSON.stringify(lists), 'utf8');
		*/
		
		
		
		console.log(lists.length +" size "+ typeof lists.length);
		//console.log(lists[0]);
		console.log("line 101 auth  "+ ++i);
		
		
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



function addNewTask(name,num){
//var parsedData = querystring.parse(postData);
//console.log("auth.js line 100  "+typeof data + " vlaue "+data);
//console.log("auth.js line 88  "+typeof password + " vlaue "+password);
	if (list[i]){
	console.log(" list in line 109 auth.js");
		return false;
	}
	num =++i;
	list[i] = num;
	fs.writeFile('db/'+ userName +'/lists/list.json',JSON.stringify(list), 'utf8');
	return true;
}



exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
exports.getPropertiesFS = getPropertiesFS;
exports.listFS = listFS;
exports.createUser 	= createUser;
exports.addNewTask 	= addNewTask;