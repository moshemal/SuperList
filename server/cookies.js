function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;
//console.log("in cookies.js servr 4 "+rc);//user = person; auth =0.5....
    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

	//console.log("in cookies.js servr "+list);
    return list;
}

exports.parseCookies = parseCookies;