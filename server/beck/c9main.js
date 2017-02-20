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

  var server = http.createServer(onRequest)
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("SuperList server listening at", addr.address + ":" + addr.port);
  });
  
}


start(router.route);