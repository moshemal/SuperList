
  define(['jquery', 'text!./BtnAdd.html','kendo'],
  function($, template){
	'use strict';
	
	function BtnAdd(initObj){
		initObj = initObj || {};
		var that = this;//????
		this._dfd = $.Deferred();//???
		var htmlDom = this.$ = $(template);//???
	}

	
	BtnAdd.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem)) //#bottom-pane
       $("#buttonWin").kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });				
		} else {
			console.log("no element to button plus");
		}
	}

	return BtnAdd;	
	});