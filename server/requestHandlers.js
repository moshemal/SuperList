var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');

function upload(response, pathname, postData) {
console.log("welcome to upload line 6 in RH.js");
  response.writeHead(200, {"Content-Type": "text/plain"});
  var parsedData = querystring.parse(postData).text;
  response.write("You have sent: " + parsedData);
  response.end();
}

function getAllListsView(response, pathname, postData,request,user) {
  console.log("welcome to getAllListsView line 14 in RH.js");

  response.writeHead(200, {"Content-Type": "application/json"});
  //JSON.stringify -
  var parsedData = JSON.stringify(db.getAllListsView(user)); //
  /*
  console.log("in line 19 RH getAllListsView:" , parsedData);
  console.log("in line 20 RH getAllListsView: " + typeof parsedData);//string
  */
  response.write(parsedData);
  response.end();
}


exports.upload      = upload;
exports.getAllListsView = getAllListsView;

