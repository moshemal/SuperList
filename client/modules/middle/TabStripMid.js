define(['jquery','text!./template.html','core/request','kendo'],
function($, template,request){
'use strict';

var middleView = $(template);

function createMiddleView(selector){
	
        middleView.appendTo(selector);
		console.log("tab strip 1");
		
	/*define a Tab Strip from kendo ui*/
        middleView.kendoTabStrip({
			dataContentField : "content",//sets the field of the data-item that provides the text content of the tab content element
			dataTextField : "label" //sets the field of the data item that provides the text name of the tab
		});
		console.log("tab strip 2");
		}
			
	var openNewTab = function(listName){
		if(listName != ""){
		var promise = request.getAllItems(listName);//form request.js getting the DB from the server
		 
       promise.then(function(data){
		console.log("tab strip 3");   
		var tab = middleView.data("kendoTabStrip");//

        itemList = $('<div id = "listView"></div>');
        itemList.kendoListView({
            template: '<div class="listView #:title#"><span class="title">#:title#</span></div>',
            selectable: true,  //witch element will be edited	
			dataSource : data.items
        });		
		
		 var dataSource = new kendo.data.DataSource({//the data
                data: [{
					label : listName ,
					content : ""
				}]
            });
			
		tab.setDataSource(dataSource);//insert the data of the list - tab
		tab.reload();//reload tabStrip tab(s) via AJAX
		
		itemList.appendTo(tab.contentElement(0));
		
		tab.select("li:first");
	   },  
		
		function(){   
		 console.log("failed in middle ");     
	   });
		}else{
			console.log("tab Strip 4");
			var tab = middleView.data("kendoTabStrip");//
			 var dataSource = new kendo.data.DataSource({//the data
                data: [{
					label : "",
					content : ""
				}]
            });
			
		tab.setDataSource(dataSource);//insert the data of the list - tab
		tab.reload();//reload tabStrip tab(s) via AJAX	
		}			
		
	};		
        
      
	  
	  
	  
      return {
		  createMiddleView : createMiddleView ,
		  openNewTab : openNewTab

	  }	  
});//