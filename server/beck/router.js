var staticLib			= require('node-static');
var url 					= require('url');
var handle				= require('./apiRoutes').handle;


var staticServer 	= new staticLib.Server('../client/');

function notFound(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("404 Not found");
  response.end();
}

function route(request, response, postData) {
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;

  //console.log("About to route a request for " + pathname);

  if (pathname.indexOf("/api") === 0){
  //console.log("About to route a request for " + pathname);
 //console.log("About to route a request for " + request.url); 
    pathname = "/" + pathname.split("/").slice(2).join("/");
    console.log("in router.js Serving api for Dynamic: ", pathname, " with data: " + postData);
	console.log("*****************************************************************************");
    return typeof handle[pathname] === 'function' ?
      handle[pathname](response, parsedUrl, postData, request) :
      notFound(response);
  } 
  else {
   // console.log("in router.js Serving static for: " + pathname);
    staticServer.serve(request, response);
  }
}
exports.route = route;

