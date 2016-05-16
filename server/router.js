var staticLib			= require('node-static');
var url 					= require('url'); 
var handle				= require('./apiRoutes').handle;


var staticServer 	= new staticLib.Server('../client/');

function notFound(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("404 Not found");
  response.end();
}

function route(request, response, postData){

/*
 - request.url - has the request details
 - parse - we use the parse function of the URL class witch we had included to in oreder 
   to get the parsedUrl.pathname
*/	
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;

  console.log("About to route a request for " + pathname);

  if (pathname.indexOf("/api") === 0){ 
    pathname = "/" + pathname.split("/").slice(2).join("/");
    console.log("in router.js Serving api for Dynamic: ", pathname, " with data: " + postData);
	console.log("*****************************************************************************");
    
	return typeof handle[pathname] === 'function' ?
      handle[pathname](response, parsedUrl, postData, request) :
      notFound(response);
  } else {
   console.log("in router.js Serving static for: " + pathname);
    staticServer.serve(request, response);
  }
}
exports.route = route;

