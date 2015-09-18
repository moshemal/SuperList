
define(['jquery', 'text!./BtnAdd.html','kendo'],

function($, template){ //Create){
	'use strict';
		
	function BtnAdd(initObj){
		initObj = initObj || {};
		//console.log("hello");
		var that = this;
        //var user = {} ;
		this._dfd = $.Deferred();
		
		var htmlDom = this.$ = $(template);
//this.appendTo();
		

	}

	
	//i want to see if i can take the user name
	//Login.prototype.setName = function (elem){
		//this.user = elem;
	//}
	
	
	
	BtnAdd.prototype.appendTo = function (elem){
	//console.log("jjjj");
		if (this.$){
			this.$.appendTo($(elem));
 $(".open-button").kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });						
		} else {
			console.log("no element to add");
		}
	}
	
	
	BtnAdd.prototype.createBtn = function (){
		if (this.$){
			//this.$.appendTo($(elem))
          $(".open").kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });				
		} else {
			console.log("no element to add");
		}
	}
	
	
	
	return BtnAdd;
	});