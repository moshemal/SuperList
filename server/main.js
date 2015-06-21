var router 	= require("./router");
var http		= require("http");

function start(route){
		function onRequest(request, response){
			var postData = "";
						
		  request.setEncoding("utf8");
		  
		  request.addListener("data", function(chunk) {
   			postData+= chunk;
			});

			request.addListener("end", function() {
			  route(request, response, postData);
			});
		}

		http.createServer(onRequest).listen(8888);
		console.log("server has started on http://127.0.0.1:8888");	
}


start(router.route);