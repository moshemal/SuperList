define(['jquery','text!./Items.html','core/request','kendo'],
function($,template,request){
	'use strict';
	//var index = 0;
	//craeting prototype
	function ItemB(initObj){
	initObj = initObj || {};
		console.log("func 0 :: hello in middle");
		//console.log("***************");
		var that = this;
		this._dfd = $.Deferred();
		var tabS = that.$ = $(template);
		that.appendTo("#tabstrip",that);//append to div func 1
		that.getMiddle(that);//get list view func 3	
		
	}
		
	/*append the list to the layout*/
ItemB.prototype.appendTo = function(elem ,that){
	if(that.$){
	console.log("func 1 :: append to middle item");
    that.$.appendTo($(elem));
	//that.createKenduTabStrip(that);//func 2
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
            dataTextField : "text"
	});
	}else{
		console.log("no element to append TO in Items");
	}
		
	}//end append to

ItemB.prototype.createKenduTabStrip = function(that){
     console.log("func 2 :: in createKenduTabStrip");
      //define a tab strip from kendo ui
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
	
	/*it's like the upload we will need to get every time the new list*/
ItemB.prototype.getMiddle = function(that){
  console.log("func 3.1 :: hello from getMiddle");
  var promise = request.getAllItems(name);//request
  promise.then(function(data){
   that.createMiddle(data,that);//func 4
   console.log("func 3.2 :: hello from get Tab Strip:",data);
	that._dfd.resolve();
		} ,
		function(){
		that._dfd.reject();
		//console.log("reject in Tab Strip");
		});
  return false;
}

ItemB.prototype.createMiddle = function (data,that){
	if (that.$){	
	//console.log("func 4 :: Secseed to create in class Middle");
      var tab = that.$.data("kendoTabStrip");
	 console.log("in func 4.1 :: " ,typeof tab);//[]
       var itemList = $('<div id=".listsOfView"></div>');
        itemList.kendoListView({
                    template: '<div class=".listsOfView #:name#"><span class="task">#:task#</span></div>',
                    selectable: true,
                    dataSource: data.items
                });
    var dataSource = new kendo.data.DataSource({
                    data: [{
                        text: name,
                        content: ""
                    }]
                });
		  console.log("in func 4.2 :: " ,typeof dataSource);
           tab.setDataSource(dataSource);
                tab.reload();				
				itemList.appendTo(tab.contentElement(0));
				console.log(tab.contentElement(0));
		      //tab.select("li:first");
		}else {
		console.log("failed to create in class Middle");
		}	
	}//end of create list view
		
ItemB.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

ItemB.prototype.getPromise = function(){
		return this._dfd.promise();
	}

	return ItemB;
});


/**
var middleView = $(view);
    var updateFunctions = [];
    var OpenItemFunction;

    function createMiddleView(selector){

        middleView.appendTo(selector);//sch

        middleView.kendoTabStrip({
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

});
**/






