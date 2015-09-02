define(['jquery','text!./templates/taskList.html', 'kendo'], 
	function($, taskList){
		'use strict';
	//console.log($);
	
	function getJListTask(type){
		var listHtml;
		switch (type){
			case "taskList":  listHtml = $(taskList); //
									break;
		
			default:    listHtml = $(taskList);
		}
		return $(listHtml);
	}

	function createListTask(type, selector,user){ //for now its "3W", "#container"
		var jListTask = getJListTask(type); //will return taskList.html
		var container = $(selector); //"#taskList"
		//container.css({
			//width: "100%",
			//height: "100%"
		//});
		jListTask.appendTo(selector);
		
		
		/**
		 create a template using the above definition
         var template = kendo.template($("#template").html());
		
		
		var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "./server/db/"+user+"/properties",
                       dataType: "jsonp"
                    }
                },
                requestStart: function() {
                    kendo.ui.progress($("#products"), true);
                },
                requestEnd: function() {
                    kendo.ui.progress($("#products"), false);
                },
                change: function() {
                    $("#products").html(kendo.render(template, this.view()));
                }
            });

            dataSource.read();
        });
		**/
		
		
		
		
					
	}

	return {
		createListTask: createListTask
	}
});