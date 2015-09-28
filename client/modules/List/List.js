define(['jquery','text!./List.html','core/request','kendo'],
function($, template ,request){
'use strict';



function ListView(initObj){
       
	   initObj = initObj || {};
		console.log("hello");
		var that = this;
		this._dfd = $.Deferred();
		var lstV = this.$ = $(template);
       
}

//it's like the upload we will need to get every time the new list
ListView.prototype.getListView = function (that){
var promise = request.getAllLists(); //form request.js getting the DB from the server

//if succeed go to createListView and put it on the screen		
promise.then(function(data){
		that._dfd.resolve();
		that.createListView(data);
		},
//else rejecet		
		function(){
		that._dfd.reject();
		console.log("rejecet");
		});
		
return false;

}

ListView.prototype.appendTo = function (elem){
		if (this.$){
		console.log("in append TO in List View");
			this.$.appendTo($(elem));
			this.$.kendoListView({
			template : '<div><span class="k-icon k-insertUnorderedList">  </span> #:name# <span class="k-icon k-i-pencil"></span></div>',
			 selectable: true
			}); 
		}
		
		else {
			console.log("no element to append TO in List View");
		}
	}
	


ListView.prototype.createListView = function (data){
		if (this.$){	
		console.log(data);
		var lst = this.$.data("kendoListView");
		var dataSource = new kendo.data.DataSource({
                data: data
            });
	   lst.setDataSource(dataSource);
       lst.refresh();
			
		} 
		 
		else {
			console.log("no element to in class LIST VIEW");
		}
	}


ListView.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

ListView.prototype.getPromise = function(){
		return this._dfd.promise();
	}
	
	
ListView.prototype.destroy = function(){
		this.$.off('submit');
		//this.$.remove();
	}


return ListView;
}); 



	


 





