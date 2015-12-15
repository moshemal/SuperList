var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');

function upload(response, pathname, postData) {
console.log("welcome to upload line 6 in RH.js");
  var lst = auth.getListFS();
  var str = JSON.stringify(lst);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var parsedData = querystring.parse(postData).text;
  response.write(str);
  response.end();
}

/**####### all name of the tasks #####**/
function getAllLists(response, pathname, postData) {
console.log("welcome to getAllLists line 18 in RH.js");
  var lst = auth.getListFS();
  var str = JSON.stringify(lst); //
  response.writeHead(200, {"Content-Type": "application/json"});
  var parsedData = querystring.parse(postData).text;
  response.write(str);
  response.end();
}

function validateCreateUserParams (parsedQuery) {
  return (typeof parsedQuery.user === 'string' &&
  typeof parsedQuery.password === 'string' &&
  parsedQuery.user !== "" && parsedQuery.password !== "");
}


function createUser (response, parsedUrl, postData){
  var parsedQuery = querystring.parse(postData);
  if (validateCreateUserParams(parsedQuery)){//line 15
    if (auth.createUser(parsedQuery.user, parsedQuery.password)){//auth.js line 80
      db.createUser(parsedQuery.user, parsedQuery.properties); //to the make dir.js 
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("we are creating user: " + parsedQuery.user);
      response.end();
      return;
    }}
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to create new user");
  response.end();
}


//the way you did create user check if the user didn't sent a empty task 
function validateCreateTaskParams(parsedQuery) {
  return (typeof parsedQuery.name === 'string' &&
  parsedQuery.name !== "");
}

/**######adding new task to the list checking + adding######**/
function addNewTask(response, parsedUrl, postData){
console.log("line 51 RH add new task");
  var parsedQuery = querystring.parse(postData);
	if(validateCreateTaskParams(parsedQuery)){
	if (auth.addNewTask(parsedQuery.name,parsedQuery.num,parsedQuery.task)){//auth.js line 80
	console.log("in line 49 request handler = " + parsedQuery.num);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("we are new Task user: " + parsedQuery);
      response.end();
      return;
    }
  }
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to create new Task THE WAS EMPTY");
  response.end();
}

//
function validateEditList(parsedQuery) {
  return (typeof parsedQuery.newName === 'string' &&
  typeof parsedQuery.oldName === 'string' &&
  parsedQuery.newName !== "" && parsedQuery.oldName !== "");
}

/**###### edit new task to the list checking + edit ######**/
function editList(response, parsedUrl, postData){
   //console.log("line 84 RH  edit task");
  var parsedQuery = querystring.parse(postData);
	if(validateEditList(parsedQuery)){
		//console.log("line 86 RH edit task");
	if (auth.editList(parsedQuery.oldName, parsedQuery.newName)){//auth.js line 143
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("from SERVER we are editing Task user: " + parsedQuery);
      response.end();
      return;
    }
	}
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("fail to edit Task ");
  response.end();
}







exports.getAllLists = getAllLists;
exports.upload      = upload;
exports.createUser  = createUser;

exports.addNewTask  = addNewTask;
exports.editList  = editList;

