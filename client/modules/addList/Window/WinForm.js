define(['jquery','text!./WinForm.html','core/request','kendo'],
function($, template,request){
'use strict';


function WinForm(initObj){
		initObj = initObj || {};
		//console.log("hello");
		var that = this;
		this._dfd = $.Deferred();
		
		var wnd = this.$ = $(template);
console.log(wnd);
		//var selecet = this.select();
		//console.log(selecet[0]);
		
		//this.appendTo("#addtask");
       this.$.kendoWindow({
              modal: true,
              title: "Create New List",
			  width: "505px",
			  height: "100px",
			  actions: ["Close"],
               resizable: false,
              visible: false
            }).data("kendoWindow");//.open();

			
			
			
			
			//when the win is open and there is the button add new list
			this.$.find("#addtask").on('submit', function(ev){
			
			 //ev.preventDefault();
			//console.log(ev);
			var name = ev.target[0].value;
			var promise = request.addNewTask(name);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			
			return false;
		});

}

WinForm.prototype.closeWin = function (){
		if (this.$){
		this.$.kendoWindow("close");
		console.log("CLOSE WIN");
		
		} else {
			console.log("no element to CLOSE WIN");
		}
	}
	
WinForm.prototype.openWin = function (){
		if (this.$){
		 this.$.data("kendoWindow").center();
		 this.$.data("kendoWindow").open();
		console.log("Open WIN");
		
		} else {
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