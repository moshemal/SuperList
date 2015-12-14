var fs 						= require('fs');

var querystring 	= require("querystring");

var passwords = null;
var i = 0;
var lists = []; // for list of task
var properitess = {};
var userName=null; //
var sessions 	= {};
var AUTH_KEY 	= "auth";


fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file auth line 14: ' + err);
		return;
	}
	passwords = JSON.parse(data);
	//console.log('read passwords auth line 21: ' +  ++i );
     
});


function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}

//first i work with this for understend Json
function propertiesFS(){
console.log("welcome to propertiesFS line 32 in auth.js");
fs.readFile('db/'+ userName +'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 29: ' + err);
		return;
	}
	properitess = data;//JSON.parse(data);
	console.log('auth line 40: ' +  ++i );
	});
}
	
function getPropertiesFS(){
propertiesFS();
return properitess;
}
	
//reading what we have in list.json	
function readListFS(){
console.log("welcome to listFS line 54 in auth.js");

//userName = getLoggedIn(cookies);
var data = fs.readFileSync('db/'+ userName +'/lists/list.json', "utf8"); //it's more fast for write and will return null
	lists = JSON.parse(data); //an Object
	console.log("line 62 auth "+   ++i);
}

function getListFS(){
readListFS();
//console.log('auth line 80: ' + lists);
return lists;
}
	
function login(response, parsedUrl, postData){
	console.log("welcome to login 72 in auth.js "+postData);
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
		//here the data base
		userName = parsedData.user; // i need the name of the user for read what inside list and for other thing
		//readListFS(); //we have to much exception so if we we need to login read for security
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;

		sessions[parsedData.user] = "" + token;
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(AUTH_KEY + "=" + token);	
		
	} 

	else {
		response.writeHead(401, {"Content-Type": "text/plain"});	
	}
	response.end();
}


//i add some problom with him when somthing with the cookie so i change it
function isLoggedIn (cookies){
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	//because i don't know how you will run the progrm and you did the cookie four days
	//when i run the program (not in a hidden window we will not get either the name ) 
	//and will not read the file of the list
	userName = user; 
console.log("in auth line 101 " +user);	
console.log("in auth line 102 " +token);
console.log("in auth line 103 " +sessions[user]); //print undefined
console.log("in auth line 104 " ,sessions[user] == token); //false
	return (token && user && sessions[user] == token);  //
}


//i have problom with the cookies
function getLoggedIn(cookies){

return cookies["user"];

}


function createUser(user, password){
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}


//adding new task after we check in RH if the DB is OK
function addNewTask(name,num,task){
var item = {
name : name,
num : lists.length + 1,
task : [] //come back
};

lists.push(item);
console.log("in auth  addNewTask: ");

fs.writeFileSync('db/'+ userName +'/lists/list.json',JSON.stringify(lists)); //faster writeFileSync
	return true;
}

//edit name of the list
function editList(oldName , newName){
console.log("line 141 auth.js edit task");
for(var i = 0 ; i<lists.length; i++){
	if(lists[i]["name"] == oldName){
		lists[i]["name"] = newName ;
		fs.writeFileSync('db/'+ userName +'/lists/list.json',JSON.stringify(lists)); //faster writeFileSync
		return true;
	}
}
console.log("fail on edit List no found Name 152 auth.js");
return false; //the name dont exsiset 	
}






exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
exports.getLoggedIn = getLoggedIn;
exports.getListFS = getListFS;
//exports.getPropertiesFS = getPropertiesFS;
exports.createUser 	= createUser;
exports.addNewTask 	= addNewTask;
exports.editList 	= editList;
