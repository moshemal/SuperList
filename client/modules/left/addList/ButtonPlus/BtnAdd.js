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
	
	
	
/*	
	function getJBtnPlus(type){
    var btnPlusHtml;
		switch (type){
			case "BtnPlus":  btnPlusHtml = $(template); //
									break;
			default:    btnPlusHtml = $(template);
		}
		return $(btnPlusHtml);
	}//
	
	
	function createBtnPlus(type, selector){ //for now its "BtnPlus", "#container"
		var jBtnPlus = getJBtnPlus(type); //will return BtnAdd.html
		var container = $(selector); //"#container"
		container.css({
			width: "100%",
			height: "100%"
		});
		jBtnPlus.appendTo(selector);
		

	 jBtnPlus.kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });					
	}

	return {
		createBtnPlus : createBtnPlus
	}
	*/
	
	
	});