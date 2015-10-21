define(['jquery','text!./List.html','core/request','kendo'],
function($, template,  request){
'use strict';



function ListView(initObj){
       
	   initObj = initObj || {};
		console.log("hello in list view");
		var that = this;
		this._dfd = $.Deferred();
		var lstV = that.$ = $(template);
		this.arrayOfBtn = [];//
		this.appendTo("#taskList");//append to div
		this.getListView(this);//get list view
	
		 //this.edtBtn = new EditBtn(); //an objecet in the class ListView will try to put it on main
       }



/*append the list to the layout*/
ListView.prototype.appendTo = function (elem){
		if (this.$){
		//console.log("in append TO in List View");
			this.$.appendTo($(elem));
			this.$.kendoListView({
			template :'<div class ="listsOfView"><span class="k-icon k-insertUnorderedList"></span><span class="name">#:name#</span><button id="edit"></button></div>',
			selectable: true //witch element will be edited
			});
		}
		else {
			console.log("no element to append TO in List View");
		}
	}//end append to
	


ListView.prototype.createListView = function (data){
		if (this.$){	
		var lst = this.$.data("kendoListView");
		var dataSource = new kendo.data.DataSource({
                data: data
            });
	   lst.setDataSource(dataSource); //insert the data of the list
       lst.refresh();
	   
	   //array of buttons
		this.arrayOfBtn = $(".listsOfView  button").kendoButton({
               spriteCssClass: "k-icon k-i-pencil",
			   click: function(e){
                   show($(e.event.target).closest(".listsOfView").find(".name").html());
				   }
           });
		   
     //console.log(this.arrayOfBtn);		
		} 
		 
		else {console.log("no element to in class LIST VIEW");}
		//return this.arrayOfBtn;
	}

//it's like the upload we will need to get every time the new list
ListView.prototype.getListView = function (that){
var promise = request.getAllLists(); //form request.js getting the DB from the server
 //console.log("hello from get all list: ", promise);
//if succeed go to createListView and put it on the screen		
promise.then(function(data){
		that.createListView(data);
		console.log("hello from creating");
		//that.getArrayOfButtons();
		that._dfd.resolve();
		} ,
//else rejecet		
		function(){
		that._dfd.reject();
		console.log("rejecet in list view get");
		});
return false;
}

//ListView.prototype.resetDeferred = function(){
		//this._dfd = new $.Deferred();
	//}

ListView.prototype.getPromise = function(){
		return this._dfd.promise();
	}
	

	
ListView.prototype.getArrayOfButtons = function(){
//console.log("hello from get all buttons :",this.arrayOfBtn);
		return this.arrayOfBtn;
	}
	
	
 var  show = function (elem){
		//var lst = this.$.data("kendoListView");
		//var item = $(elem).closest("[role='option']");
		//var data = lst.dataSource.getElementById(item.data("uid"));
		//alert(data.name);
	console.log(elem); // will print the name	
	}

	

return ListView;
}); 



	


 





