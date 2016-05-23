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
function getAllListsView(user){
	console.log("in server/db.js line 31: ",user);
	console.log("################################");
	if(user){
		//the path db/user/lists/fileName1...n.json
		var files = fs.readdirSync('./db/'+user+'/lists'); //Returns an array of filenames
		var output = [];
		for(var i = 0 ; i < files.length ;i++){
		var count = 0 ; //for every fileName(n).json reset in order to count his items
		//JSON.parce - 
		
		  count = JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + files[i], 'utf8')).items.length;
		 /* 
		 console.log("in of task",count);
		 console.log("in of task", files[i].split('.')[0]);
		 */
		 
		output.push({title : files[i].split('.')[0] , id : i ,count : count});
	}
	return output;
	}//end of if
	
	return {}; //return empty
}

function getAllItems(user,listName){
	console.log("in server/db.js line 56: ",user);
	console.log("in server/db.js line 57: ",listName);
	console.log("################################");
	if(user){
		  return  JSON.parse(fs.readFileSync('./db/' + user + '/lists/' + listName, 'utf8')).items.length;
	}	
	return {}; //return empty
}



exports.createUser = createUser;
exports.getAllListsView =  getAllListsView;