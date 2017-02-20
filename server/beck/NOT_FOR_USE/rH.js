var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./authTemp');



/**####### all name of the tasks #####
function getAllLists(response, pathname, postData) {
console.log("welcome to getAllLists line 18 in RH.js");
  var lst = auth.getListFS();
   console.log("in List RH "+typeof lst);
  var str = JSON.stringify(lst); //
  console.log("in List RH "+typeof str);
  response.writeHead(200, {"Content-Type": "application/json"});
  var parsedData = querystring.parse(postData).text;
  response.write(str);
  response.end();
}
**/

/**###### remove new task to the list checking + remove ######**/
function getAllItems(response, parsedUrl, postData){
  
}



//exports.getAllLists = getAllLists;
exports.getAllItems = getAllItems;


/**
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

function createUser (response, parsedUrl, postData){
  var parsedQuery = querystring.parse(postData);
  if (validateCreateUserParams(parsedQuery)){
    if (auth.createUser(parsedQuery.user, parsedQuery.password)){
      db.createUser(parsedQuery.user, parsedQuery.properties);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("we are creating user: " + parsedQuery.user);
      response.end();
      return;
    }
  }
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.write("fail to create new user");
  response.end();
}

function getListView(response, parsedUrl, postData,request, user){
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(db.getListView(user)));
    response.end();
}

function addList(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != ""){
        db.addList(user, parsedQuery.listName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function editList(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.oldName != "" && parsedQuery.newName != ""){
        db.editList(user, parsedQuery.oldName, parsedQuery.newName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function removeList(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != ""){
        db.removeList(user, parsedQuery.listName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function getItems(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != ""){
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(db.getItems(user, parsedQuery.listName)));
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function getItem(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != "" && parsedQuery.itemName){
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(db.getItem(user, parsedQuery.listName, parsedQuery.itemName)));
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function addItem(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != "" && parsedQuery.itemName){
        db.addItem(user, parsedQuery.listName, parsedQuery.itemName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function editItem(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != "" && parsedQuery.itemName){
        db.editItem(user, parsedQuery.listName, parsedQuery.itemName, parsedQuery);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

function removeItem(response, parsedUrl, postData, request, user){
    var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != "" && parsedQuery.itemName){
        db.removeItem(user, parsedQuery.listName, parsedQuery.itemName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
}

exports.upload      = upload;
exports.createUser  = createUser;
exports.getListView  = getListView;
exports.addList  = addList;
exports.editList  = editList;
exports.removeList  = removeList;

exports.getItems = getItems;
exports.getItem = getItem;
exports.addItem = addItem;
exports.editItem = editItem;
exports.removeItem = removeItem;


**/


