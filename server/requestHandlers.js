var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');

function upload(response, pathname, postData) {
  console.log("upload was called");
  response.writeHead(200, {"Content-Type": "text/plain"});
  var parsedData = querystring.parse(postData).text;
  response.write("You have sent: " + parsedData);
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

exports.upload      = upload;
//exports.createUser  = createUser;