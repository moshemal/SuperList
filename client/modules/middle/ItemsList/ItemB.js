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
		that.getMiddle(that,initObj);//get list view func 3	
		
	}
	
	
	/*append the list to the layout*/
ItemB.prototype.appendTo = function(elem ,that){
	if(that.$){
	console.log("func 1 :: append to middle item");
    that.$.appendTo($(elem));
	//that.createKenduTabStrip(that);//func 2
	that.$.kendoTabStrip({
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
ItemB.prototype.getMiddle = function(that,name){
  console.log("func 3 :: hello from getMiddle");
  var promise = request.getAllItems(name);//request
  promise.then(function(data){
   that.createMiddle(data);//func 4
   console.log("hello from get Tab Strip:",data);
	that._dfd.resolve();
		} ,
		function(){
		that._dfd.reject();
		console.log("reject in Tab Strip");
		});
  return false;
}

ItemB.prototype.createMiddle = function (data){
	if (this.$){	
	//console.log("func 4 :: Secseed to create in class Middle");
      var tab = this.$.data("kendoTabStrip");
	 console.log("in func 4.1 :: " ,typeof tab);//[]
       var itemList = $('<div id="listView"></div>');
        itemList.kendoListView({
                    template: '<div class="listView #:task#"><span class="task">#:task#</span></div>',
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



