define(['jquery','text!./WinForm.html','kendo'],
function($, template){
'use strict';


function WinForm(initObj){
		initObj = initObj || {};
		//console.log("hello");
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();
		
		var wnd = this.$ = $(template);
//this.appendTo();
       this.$.kendoWindow({
              modal: true,
              title: "Dialog window",
			  width: "505px",
			  actions: ["Close"],
              
              visible: false
            }).data("kendoWindow");//.open();



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
	
	
	



return WinForm;

});