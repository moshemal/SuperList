//this class is a combination between kendo and class object for ect. with Login and layout
//this class only open a window
define(['jquery', 'text!./BtnEdit.html','kendo'],
function($, template){ //Create){
	'use strict';
		
	function EditBtn(initObj){
		initObj = initObj || {};
		console.log("hello edit button");
		var that = this;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template);
//this.appendTo();
	
	}

	
	
	EditBtn.prototype.appendTo = function (elem){
	//console.log("jjjj");
		if (this.$){
			this.$.appendTo($(elem));
 $(".open-button").kendoButton({
		 spriteCssClass: "k-icon k-i-pencil"
		 });						
		} else {
			console.log("no element to editing");
		}
	}
	

	return EditBtn;
	});