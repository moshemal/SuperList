define(['jquery','text!./template.html','kendo'],
function($,template){
	'use strict';
	
	
	function Window(initObj){
	initObj = initObj || {};
    var that = this;//????
	this._dfd = $.Deferred();//???
	var htmlDom = this.$ = $(template);//???
	
	//create kendu window
	this.$.kendoWindow({
              modal: true,
              title: "Create New List",
			  width: "505px",
			  height: "150px",
			  actions: ["Close"],
              resizable: false,
              visible: false
            }).data("kendoWindow");
	}
	
	


   Window.prototype.getPromise = function(){
		return this._dfd.promise();
	}
		


	


	
		
	return Window;
	
});