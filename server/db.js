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
						fs.writeFile('./db/' + user + '/lists/list.json', [] , 'utf8');
						
					});
					
			});
		
		
		
		}//end else
	})
}

exports.createUser = createUser;