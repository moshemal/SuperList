/*this class is a combination between kendo and class object for ect. 
  with Login and layout this class only open a window*/

  define(['jquery', 'text!./BtnAdd.html','kendo'],
  function($, template){
	'use strict';
		
	function BtnAdd(initObj){
		initObj = initObj || {};
		//console.log("hello button plus");
		var that = this;
		this._dfd = $.Deferred();
		var htmlDom = this.$ = $(template);
	}

	
	
	BtnAdd.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem));
		//define a button plus 	
      $(".open-button").kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });						
		} else {
			console.log("no element to add");
		}
	}
	
	return BtnAdd;
	});