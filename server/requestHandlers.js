var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');

function upload(response, pathname, postData) {
console.log("welcome to upload line 6 in RH.js");
  //console.log("upload was called"); 
  //var p = auth.getPropertiesFS();
  var lst = auth.getListFS();
  var str = JSON.stringify(lst);
  //console.log(str);
  
  
  //console.log("welcome to upload line 10 in RH.js "+p);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var parsedData = querystring.parse(postData).text;
  //var pp = querystring.parse(p).text;
  //console.log("line 10 "+pp);
  response.write(str);
  response.end();
}

function validateCreateUserParams (parsedQuery) {
  return (typeof parsedQuery.user === 'string' &&
  typeof parsedQuery.password === 'string' &&
  parsedQuery.user !== "" && parsedQuery.password !== "");
}

//from apiRouter.js "/createUser":  requestHandlers.createUser,
function createUser (response, parsedUrl, postData){
  var parsedQuery = querystring.parse(postData);
  if (validateCreateUserParams(parsedQuery)){//line 15
    if (auth.createUser(parsedQuery.user, parsedQuery.password)){//auth.js line 80
      db.createUser(parsedQuery.user, parsedQuery.properties); //to the make dir.js 
      response.writeHead(200, {"Content-Type": "text/plain"});
	 // console.log("in line 28 request handler = " + parsedQuery.properties);
      response.write("we are creating user: " + parsedQuery.user);
      response.end();
      return;
    }
  }
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to create new user");
  response.end();
}



function addNewTask(response, parsedUrl, postData){
//console.log(postData);console.log(typeof postData);
  var parsedQuery = querystring.parse(postData);
  //console.log(parsedQuery);console.log(typeof parsedQuery);
    if (auth.addNewTask(parsedQuery.name,parsedQuery.num,parsedQuery.task)){//auth.js line 80
	console.log("in line 49 request handler = " + parsedQuery.num);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("we are Task user: " + parsedQuery);
      response.end();
      return;
    }
  
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to create new Task");
  response.end();
}


exports.upload      = upload;
exports.createUser  = createUser;
exports.addNewTask  = addNewTask;


