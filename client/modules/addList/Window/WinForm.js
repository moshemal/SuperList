define(['jquery','text!./WinForm.html','core/request','kendo'],
function($, template,request){
'use strict';


function WinForm(initObj){
		initObj = initObj || {};
		//console.log("hello");
		var that = this;
		this._dfd = $.Deferred();
		var wnd = this.$ = $(template);

		
		
       this.$.kendoWindow({
              modal: true,
              title: "Create New List",
			  width: "505px",
			  height: "150px",
			  actions: ["Close"],
               resizable: false,
              visible: false
            }).data("kendoWindow");//.open();

				//console.log(this.$);		
			/*when the win is open and there is the button add new list*/
			this.$.find("#addtask").on('submit', function(ev){
			 //ev.preventDefault(); 
			//alert("button save",ev.target[1]);
			var name = ev.target[0].value;
			var promise = request.addNewTask(name);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			//console.log("hello win form");
			return false;
		});
}

WinForm.prototype.closeWin = function (){
		if (this.$){
		this.$.kendoWindow("close");
		console.log("CLOSE WIN of adding new task");
		} else {
			console.log("no element to CLOSE WIN");
		}
	}
	
WinForm.prototype.openWin = function (){
		if (this.$){
		 this.$.data("kendoWindow").center();
		 this.$.data("kendoWindow").open();
		//console.log("Open WIN in adding");
		} else{
			console.log("no element to Open WIN");
		}
	}
	
		
WinForm.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

WinForm.prototype.getPromise = function(){
		return this._dfd.promise();
	}
	
	
WinForm.prototype.destroy = function(){
		this.$.off('submit');
		this.$.remove();
	}
	
WinForm.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}


return WinForm;
});