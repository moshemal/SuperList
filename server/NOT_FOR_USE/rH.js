var querystring = require('querystring');
var db					= require('./db');
var auth				= require('./auth');



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
  var parsedQuery = querystring.parse(postData);
  console.log("in line 125 RH",parsedQuery);
	
	if(validateRemoveList(parsedQuery)){
		var item =auth.getAllItems(parsedQuery.name) ;
	//if(auth.getAllItems(parsedQuery.name)){//auth.js line 143
	console.log("line 128 RH get All Items",typeof item);
      response.writeHead(200, {"Content-Type": "text/plain"}); 
	  response.write(item.toString());
      response.end();
      return;
    //}
	}
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("fail to get All Items ");
  response.end();
}



//exports.getAllLists = getAllLists;
exports.getAllItems = getAllItems;