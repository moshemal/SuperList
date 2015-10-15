define(['jquery','text!./EditList.html','core/request','kendo'],
function($, template,request){
'use strict';


function EditList(initObj){
		initObj = initObj || {};
		console.log("hello in edit list");
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();
		
		var edit = this.$ = $(template);
console.log(edit);
		
		
		
       this.$.kendoWindow({
              modal: true,
              title: "Edit  List",
			  width: "505px",
			  height: "100px",
			  actions: ["Close"],
               resizable: false,
              visible: false
            }).data("kendoWindow");//.open();

			
			//when the win is open and there is the button add new list
			this.$.find("#editremovelist").on('submit', function(ev){
			//console.log(ev);
			//var name = ev.target[0].value;
			//var promise = request.addNewTask(name);
			//promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			
			return false;
		});

}


EditList.prototype.openWin = function (){
		if (this.$){
		 this.$.data("kendoWindow").center();
		 this.$.data("kendoWindow").open();
		console.log("Open Edit WIN");
		
		} else {
			console.log("no element to Edit Open WIN");
		}
	}
	
		
EditList.prototype.closeWin = function (){
		if (this.$){
		this.$.kendoWindow("close");
		console.log("CLOSE EDIT WIN");
		
		} else {
			console.log("no element to CLOSE EDIT WIN");
		}
	}




return EditList;

});





 