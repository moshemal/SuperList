var fs = require('fs');

function createUser (user, properites){
	fs.stat('./db/' + user, function(err, stat){
	//console.log("in db.js "+properites);
		if (stat){
	
			return;
		} 
		else {
			fs.mkdir('./db/' + user , //file db --> file user
			
			function(){
					fs.mkdir('./db/' + user + '/lists', //file db --> file user --> file list  
					
					
					function(){
					//file db -->file user --> properties.json
				        //properites={
						//"full": "value",
                        //	"job: "value"					
						//}
						var e =[];
						
						fs.writeFile('./db/' + user + '/properites.json', properites , 'utf8');
						fs.writeFile('./db/' + user + '/lists/list.json', JSON.stringify(e) , 'utf8');
						
					});
					
			});
		}//end else
	})
}

//
function getListsView(user){
	
	console.log("in server/db.js line 38: ",user);
	
	if(user){
		var files = fs.readdirSync('./db/'+user+'/lists'); //Returns an array of filenames
	}
	
}


exports.createUser = createUser;
exports.getListsView =  getListsView;