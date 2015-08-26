var fs = require('fs');


function createUser (user, properites){
	fs.stat('./db/' + user, function(err, stat){
	
		if (stat){
	
			return;
		} else {
		//make a user file
			fs.mkdir('./db/' + user, function(){
			//make a file that his path db/user/lists
					fs.mkdir('./db/' + user + '/lists', 
					function(){
					//write to the file path db/user/properites.json its properties
						fs.writeFile('./db/' + user + '/properites.json', JSON.stringify(properites), 'utf8');
					});
			});
		}
	})
}

exports.createUser = createUser;