define(['jquery','text!./List.html','core/request','kendo'],
function($, template ,request){
'use strict';



function ListView(initObj){
       
	   initObj = initObj || {};
		console.log("hello in list view");
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
		console.log("rejecet in list view get");
		});
		
return false;

}


/*append the list to the layout*/
ListView.prototype.appendTo = function (elem){
		if (this.$){
		
		console.log("in append TO in List View");
			this.$.appendTo($(elem));
			this.$.kendoListView({
			template : '<div id ="listsOfView">#:name#<input type="button" value="edit" class="edit-button" /></div>',
			//<button id ="btnEdt" class ="k-button open-button"></button></div>',
            //template :'<div class ="listsOfView">#:name#<a class="k-button k-button-icontext k-add-button" href="\\#"><span class="k-icon k-add"></span></a></div>'
			//'<div class="listOfView"><span class="k-icon k-insertUnorderedList"></span> <span class>#:name# <button></button></div>',//<span class="k-icon k-i-pencil"></span></div>',
			//<a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
			  //editTemplate: 
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
		//this.$.appendTo($(".listOfView button"));
     //$(".listsOfView > button").kendoButton({
               //spriteCssClass: "k-icon k-i-pencil"
				//click: function(){startEditOrRemove();}
				
           //});


		
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



	


 





