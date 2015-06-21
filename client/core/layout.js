define(['jquery', 'text!./templates/l2U.html', 'text!./templates/l3W.html', 'kendo'], 
	function($, l2U, l3W){
		'use strict';
	
	
	function getJLayout (type){
		var layoutHtml;
		switch (type){
			case "2U":  layoutHtml = $(l2U);
									break;
			case "3W":  layoutHtml = $(l3W);
									break;
			default:    layoutHtml = $(l3W);
		}
		return $(layoutHtml);
	}

	function createLayout (type, selector){
		var jLayout = getJLayout(type);
		var container = $(selector);
		container.css({
			width: "100%",
			height: "100%"
		});
		jLayout.appendTo(selector);
		jLayout.kendoSplitter();
	}

	return {
		createLayout: createLayout
	}
});