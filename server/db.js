var fs = require('fs');


function createUser (user, properites){
	fs.stat('./db/' + user, function(err, stat){
		if (stat){
			return;
		} else {
			fs.mkdir('./db/' + user, function(){
					fs.mkdir('./db/' + user + '/lists', function(){
						fs.writeFile('./db/' + user + '/properites.json', properites, 'utf8');
					});
			});
		}
	})
}

exports.createUser = createUser;