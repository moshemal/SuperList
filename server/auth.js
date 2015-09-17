var fs 						= require('fs');
var fs2 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var i = 0;
var index =0;
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
     //console.log("auth line 20 "+ ++i);
	//console.log(passwords);
	//console.log(typeof passwords);
});


function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}


function propertiesFS(){
console.log("welcome to propertiesFS line 32 in auth.js");
fs.readFile('db/'+ userName +'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 29: ' + err);
		return;
	}
	//console.log('auth line 33: ' + properitess );
	properitess = data;//JSON.parse(data);
	console.log('auth line 40: ' +  ++i );
	});
}
	

function getPropertiesFS(){
propertiesFS();
return properitess;
}
	
	
function listFS(){
console.log("welcome to listFS line 54 in auth.js");
var data = fs.readFileSync('db/'+ userName +'/lists/list.json', "utf8");
//fs2.readFile('db/'+ userName +'/lists/list.json', 'utf8' ,function(err, data){
	//if(err){
		//console.log('error reading file 56: ' + err);
		//return;
	//}
	//console.log('auth line 60: ' +typeof data);
	lists = JSON.parse(data);
	console.log("line 62 auth "+   ++i);
}

function getListFS(){
listFS();
//console.log('auth line 80: ' + lists);
return lists;
}
	
function login(response, parsedUrl, postData){
	console.log("welcome to login 72 in auth.js "+postData);
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
		listFS();
		console.log(lists.length +" size "+ typeof lists.length);
		console.log("line 86 auth  "+ ++i);		
		/**
		//var name = "gali";
		//var num = i++;
		var task =[];
	    var item ={};
   item["name"] =name;		
	item["num"] =num;	
	item["task"] =task;	
		lists.push(item);
		fs.writeFile('db/'+ userName +'/lists/list.json',JSON.stringify(lists), 'utf8');
		**/
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(AUTH_KEY + "=" + token);	
		//response.write("nnn" + properites.full);	
	} 

	else {
		response.writeHead(401, {"Content-Type": "text/plain"});	
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
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}



function addNewTask(name,num,task){

//console.log("name is auth 135"+typeof name);
//console.log("num is 136  "+num);
console.log("task is 137 "+typeof task);

var item = {
name : name,
num : lists.length + 1,
task : [] //come back
};

lists.push(item);
fs.writeFile('db/'+ userName +'/lists/list.json',JSON.stringify(lists), 'utf8');
	return true;
}



exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
exports.getListFS = getListFS;
//exports.getPropertiesFS = getPropertiesFS;

exports.createUser 	= createUser;
exports.addNewTask 	= addNewTask;