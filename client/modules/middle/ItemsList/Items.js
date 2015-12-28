define(['jquery','text!./Items.html','core/request','kendo'],
function($, template,request){
'use strict';

function Items(initObj){
	   initObj = initObj || {};
		console.log("hello in ITEMS list view");
		var that = this;
		this._dfd = $.Deferred();
		var itemsV = that.$ = $(template);
		that.appendTo("#taskList",that);//append to div
		that.getListView(that);//get list view
       }

/*append the list to the layout*/
Items.prototype.appendTo = function(elem ,that){
		if (that.$){
		console.log("in append TO in Items");
		that.$.appendTo($(elem));
		/*define a tab strip from kendo ui*/
			that.$.kendoTabStrip({
			animation: {
            // fade-out current tab over 1000 milliseconds
            close: {
                duration: 1000,
                effects: "fadeOut"
            },
           // fade-in new tab over 500 milliseconds
           open: {
               duration: 500,
               effects: "fadeIn"
           }
       },
            dataContentField: "content",
            dataTextField : "label"
        });
			
		}
		
		else {
			console.log("no element to append TO in Items");
		}
	}//end append to
	
Items.prototype.getLstOfItems(that,name){
	var promise = request.getAllItems(name); //form request.js getting the DB from the server
   promise.then(function(data){
   //console.log("in getListView");
   that.createListView(data);
   console.log("hello from get list ITEMS resolve:",data);
	that._dfd.resolve();
		} ,
       //else reject		
		function(){
		that._dfd.reject();
		console.log("reject in list view get ITEMS");
		});
return false;
	
	
	
}
	
Items.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

Items.prototype.getPromise = function(){
		return this._dfd.promise();
	}


	
 return Items;
}); 



/**
define(['jquery', 'text!./view.html','text!./addNewItem.html', 'core/request', 'kendo'], function($, view, addNewItem, request){

    var middleView = $(view);
    var updateFunctions = [];
    var OpenItemFunction;

   

    var openNewTab = function(listName,itemName){
        if(listName != ""){
            request.getItems(listName).then(function(data){
                var tab = middleView.data("kendoTabStrip");

                var itemList = $('<div id="listView"></div>');

                itemList.kendoListView({
                    template: '<div class="listView #:title#"><span class="title">#:title#</span></div>',
                    selectable: true,
                    change: function(){
                        var select = this.select();
                        OpenItemFunction(listName,$(select[0]).find(".title").html());
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
**/











