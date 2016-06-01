var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');


function getAllListsView(response, parsedUrl, postData,request,user) {//response, parsedUrl, postData,request, user
  console.log("welcome to getAllListsView line 14 in RH.js");
  response.writeHead(200, {"Content-Type": "application/json"});
  //JSON.stringify -
  var parsedData = JSON.stringify(db.getAllListsView(user)); //
  console.log("in line 20 RH getAllListsView: " + typeof parsedData);//string
  response.write(parsedData);
  response.end();
}


//######adding new task to the list checking + adding######
function addList(response, parsedUrl, postData,request,user){
     var parsedQuery = querystring.parse(postData);
    if(parsedQuery.listName != ""){
        db.addList(user, parsedQuery.listName);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Ok");
        response.end();
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("");
        response.end();
    }
    }


//###### edit new task to the list checking + edit ######
function editList(response, parsedUrl, postData,request,user){
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



//###### remove new task to the list checking + remove ######
function removeList(response, parsedUrl, postData,request,user){
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

	
	
	
	
	

function getAllItems(response, pathname, postData,request,user){
  var parsedQuery = querystring.parse(postData);
  
   console.log("welcome to getAllItems line 28 in RH.js",parsedQuery.listName);
   console.log("welcome to getAllItems line 29 in RH.js typeof",typeof parsedQuery.listName);
 
   if(parsedQuery.listName != "" ){       		 
  response.writeHead(200, {"Content-Type": "application/json"});
  response.write(JSON.stringify(db.getAllItems(user, parsedQuery.listName))); //will return a string 
  response.end();		 
	return;		 
	}
	
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("");
  response.end();			
}

//exports.upload      = upload;
exports.getAllListsView = getAllListsView; //left
exports.addList = addList;
exports.editList  = editList;
exports.removeList   = removeList;

exports.getAllItems = getAllItems; //middle
