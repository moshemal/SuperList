define(['jquery','text!./template.html','core/request','kendo'],
function($ , tabHtml,request){
	'use strict';
	
	var middle = $(tabHtml);
	var updateFunctions = [];
	
  function createMiddle(selector){
		
		middle.appendTo(selector);
		
		console.log("check tab1");
		
		middle.kendoTabStrip({
			dataContentField: "content", //sets the field of the data item that provides the text content of the tab content element		
			dataTextField : "label"//sets the field of the data item that provides the text name TAB
			
		});
			console.log("check tab2 ");	
	}
	
	
	
    var openNewTab = function(listName,itemName){
		console.log("check tab 6",listName);
        if(listName != ""){
			console.log("check tab 7");
            request.getAllItems(listName).then(function(data){
                var tab = middle.data("kendoTabStrip");

                var itemList = $('<div id="listView"></div>');

                itemList.kendoListView({
                    template: '<div class="listView #:title#"><span class="title">#:title#</span></div>',
                    selectable: true,
                    change: function(){
                        var select = this.select();
                        console.log(listName,$(select[0]).find(".title").html());
                    },
                    dataSource: data.items
                });

                if(itemName)
                    itemList.select($(itemList.element).find("."+itemName));

                var dataSource = new kendo.data.DataSource({
                    data: [{
                        label: listName,
                        content: ""
                    }]
                });

                tab.setDataSource(dataSource);
                tab.reload();

                
                itemList.appendTo(tab.contentElement(0));

                $(tab.contentElement(0)).find("button").kendoButton({
                    click: function(e) {
                            for(var i=0; i<updateFunctions.length; i++){
                                updateFunctions[i](listName);
                            }
                    }
                });

                tab.select("li:first");
            },
			function(){
				console.log("Failed");
			});
        }else{
			console.log("check 8");
            var tab = middle.data("kendoTabStrip");
            var dataSource = new kendo.data.DataSource({
                data: [{
                    label: "",
                    content: ""
                }]
            });
            tab.setDataSource(dataSource);
            tab.reload();
        }
    };
	
	
 var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };




	  
    return{
		 createMiddle :  createMiddle,
		 openNewTab : openNewTab ,
		 addFunctionForChanges : addFunctionForChanges
	}
	
	
});




