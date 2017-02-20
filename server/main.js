/*require is used to load a module*/ 



/*the server will be require to answer on adress that 
depends on request adress --> it's require URL
in order to mapping every request to a fit function*/
var router 	= require("./router");


/*the server have to be able to return 
interent pages --> he need to have a compenent that 
fill http request*/
var http	= require("http"); 

function start(route){

/*
# request objecet contains all the information about the request that has been made to the server 
- (for example : it's contains URL string )
# response objecet is the objecet that handles the response from the server.
*/	
  function onRequest(request, response){
    var postData = "";//from the user
    request.setEncoding("utf8");

	//called when a new chunk of data was received
    request.addListener("data", function(chunk){
      postData+= chunk;
    });

	//called when a all chunk of data have been received
    request.addListener("end", function() {
      route(request, response, postData);
    });
  } //end onRequest

  
  http.createServer(onRequest).listen(8888);
  console.log("in main.js : server has started on http://127.0.0.1:8888");
} //end start


start(router.route);






