
  define(['jquery', 'text!./BtnAdd.html','kendo'],
  function($, template){
	'use strict';
	
	function getBtnPlus(type){
		var btnPlusHtml = $(template);
		return $(btnPlusHtml);
	}
	
	function createBtnPlus(type, selector){
		var jBtnPlus = getBtnPlus(type);
		jBtnPlus.appendTo(selector);//
		
		$(".open-button").kendoButton({
		 spriteCssClass: "k-icon k-i-plus"
		 });
	}
	
	function getJqueryBtn(){
		var btnPlusHtml = $(template);
		return $(btnPlusHtml);
	}
	

	return {
		createBtnPlus : createBtnPlus,
		getJqueryBtn : getJqueryBtn
	}
	
	
	
	});