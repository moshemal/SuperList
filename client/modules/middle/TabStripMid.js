define(['jquery','text!./template.html','kendo'],
function($ , tabHtml){
	'use strict';
	
	var middle = $(tabHtml);
	
	var createMiddle = function(selector){
		
		middle.appendTo(selector);
		
		console.log("check tab1");
		
		middle.kendoTabStip({
			dataTextField : "label", //sets the field of the data item that provides the text name TAB
			dataContentField : "content" //sets the field of the data item that provides the text content of the tab content element		
		});
		
		console.log("check tab2 ");	
	};
	
	
	var openNewTab = function(listName){
		console.log("check 3 tab listName is : "+listName);
		
		if(listName == undefined || listName == ""){
			var tab = middle.data("kendoTabStip");
			var dataSource = new kendo.data.DataSource({
                data: [{
                    label: "",
                    content: ""
                }]
            });
			
			tab.setDataSource(dataSource);
            tab.reload();
			console.log("check 4 if no listName");
			return;
		}
		
		//else
			var promise = request.getAllItems(listName);//form request.js getting the DB from the server
			 promise.then(function(data){
               var tab = middleView.data("kendoTabStrip");
               var itemList = $('<div id="listView"></div>');

                itemList.kendoListView({
                    template: '<div class="listView #:title#"><span class="title">#:title#</span></div>',
                    selectable: true,
                    dataSource: data.items
                });

                var dataSource = new kendo.data.DataSource({
                    data: [{
                        label: listName,
                        content: ""
                    }]
                });

                tab.setDataSource(dataSource);
                tab.reload();
                tab.select("li:first");
            },
			function(){
				console.log("failed");
			});
		
		console.log("check 6 tab strip");		
	};
      





	  
    return{
		 createMiddle :  createMiddle,
		 openNewTab : openNewTab
	}
	
	
});