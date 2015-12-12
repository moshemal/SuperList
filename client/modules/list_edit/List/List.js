define(['jquery','text!./List.html','core/request','kendo'],
function($, template,request){
'use strict';

function ListView(initObj){
	   initObj = initObj || {};
		console.log("hello in list view");
		var that = this;
		this._dfd = $.Deferred();
		var lstV = that.$ = $(template);
		that.arrayOfBtnHtml = [];//html of the buttons
		that.appendTo("#taskList",that);//append to div
		that.getListView(that);//get list view
       }

/*append the list to the layout*/
ListView.prototype.appendTo = function (elem ,that ){
		if (that.$){
		console.log("in append TO in List View");
		that.$.appendTo($(elem));
		/*define a list view from kendo ui*/
			that.$.kendoListView({
			//editTemplate :'<div class><></>All<></></div>',
			template:'<div class ="listsOfView"><span class="k-icon k-insertUnorderedList"></span><span class="name">#:name#</span><button></button></div>',
			selectable: true //witch element will be edited
			});
		}
		else {
			console.log("no element to append TO in List View");
		}
	}//end append to
	
/*it's like the upload we will need to get every time the new list*/
ListView.prototype.getListView = function (that){
 var promise = request.getAllLists(); //form request.js getting the DB from the server
 console.log("hello from method class getListView of class ListView");
 //if succeed go to createListView and put it on the screen (for checking
 console.log("data",promise);		
 promise.then(function(data){
 console.log("in getListView");
		that.createListView(data);
		console.log("hello from get list resolve");
		//that.getArrayOfButtons();
		that._dfd.resolve();
		} ,
       //else reject		
		function(){
		that._dfd.reject();
		console.log("reject in list view get");
		});
return false;
}

 ListView.prototype.createListView = function (data){
		if (this.$){	
		var lst = this.$.data("kendoListView"); //take the data of kendoListView that we define in appendTo
		var dataSource = new kendo.data.DataSource({
                data: data
            });
	   lst.setDataSource(dataSource); //insert the data of the list
       lst.refresh(); //was recommand to do will find a better explain	   
	  console.log("in create LIST VIEW");
	   //console.log("array of button" ,lst.element.children());//all the template
	   
	   //array of buttons to create of html 
		var row = $(".listsOfView  button").kendoButton({
               spriteCssClass: "k-icon k-i-pencil" 	  
           });   
		this.arrayOfBtnHtml = $(row);
		
		}else {
		console.log("failed to create in class LIST VIEW");
		}
	}//end of create

ListView.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

ListView.prototype.getPromise = function(){
		return this._dfd.promise();
	}

/*for the edit list BUTTONS*/	
ListView.prototype.getArrayOfButtons = function(){
 //console.log("hello from get all buttons :",this.arrayOfBtn);
		return this.arrayOfBtnHtml;
	}
	
 return ListView;
}); 



	


 





