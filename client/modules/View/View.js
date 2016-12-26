define(['jquery', 'text!./view.html','text!./addNewItem.html', 'core/request', 'kendo'],
 function($, view, addNewItem, request){
	 'use strict';


    var middleView = $(view);
    var updateFunctions = [];
    var OpenItemFunction;

    function createMiddleView(selector){

        middleView.appendTo(selector); //#center-pane

        middleView.kendoTabStrip({
            dataContentField: "content",
            dataTextField : "label"
        });
    }

    var openNewTab = function(listName,itemName){
        if(listName != ""){
            request.getItems(listName).then(function(data){ //get the items of the lists
                
				var tab = middleView.data("kendoTabStrip"); //the list name 
                var itemList = $('<div id="listMiddView"></div>'); //the content

                itemList.kendoListView({
                    template: '<div class="listMiddView #:title#"><span class="title">#:title#</span></div>', //each item
                    selectable: true,
                    change: function(){
                        var select = this.select();
                        OpenItemFunction(listName,$(select[0]).find(".title").html());
						//console.log($(select[0]));
                    },
                    dataSource: data.items //content
                });
				
				console.log($(itemList));
				//console.log($(select[0]).find(".title").html());
/*
$( ".listMiddView #:title#" )
       .on( 'mouseover', function(e){
           $(e.target).closest(".listMiddView #:title#").find(".title").css({
			"background-color": "pink",
			"background": "pink", 
            "background":" pink", 
            "background": "pink", 
            "background": "pink" 
			
			 });	
         })
		 
      .on('mouseleave',function(e) {
		  $(e.target).closest(".listMiddView #:title#").find(".title").css({
			 "background": "silver",   
    "background": "-webkit-linear-gradient(left, DarkSlateGrey,silver )",
    "background":" -o-linear-gradient(right, DarkSlateGrey,silver)", 
   "background": "-moz-linear-gradient(right, DarkSlateGrey,silver)", 
   "background": "linear-gradient(to right, DarkSlateGrey,silver)" 
			 });
			 
            });			

*/

				
            
				
                if(itemName){ //
				console.log(itemName);
                   itemList.select($(itemList.element).find("."+itemName));//
                
				}
                var dataSource = new kendo.data.DataSource({
                    data: [{
                        label: listName,
                        content: ""
                    }]
                });

                tab.setDataSource(dataSource);
                tab.reload();

                var addItem = $(addNewItem);

                addItem.appendTo(tab.contentElement(0));
                itemList.appendTo(tab.contentElement(0));
                $(tab.contentElement(0)).find("button").kendoButton({
                    click: function(e) {
                        request.addItem(listName,$(tab.contentElement(0)).find("input").val()).then(function(){
                            for(var i=0; i<updateFunctions.length; i++){
                                updateFunctions[i](listName);
                            }
                        });
                    }
                });
                tab.select("li:first");
            });
			
			
        }else{
            var tab = middleView.data("kendoTabStrip");
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

    var addFunctionForOpenItem = function(func){
        OpenItemFunction = func;
    };

    return {
        createMiddleView: createMiddleView,
        openNewTab: openNewTab,
        addFunctionForChanges: addFunctionForChanges,
        addFunctionForOpenItem: addFunctionForOpenItem
    }

});