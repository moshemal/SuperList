define([], function(){
	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
	//console.log("in cookies client:: "+ca);
	
	//console.log("in client/core/cookies.js");
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' '){ 
		c = c.substring(1);
		//console.log("in cookies client:: "+c);
		
		}
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
	}

	return {
		getCookie: getCookie
	}
})