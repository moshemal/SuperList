define(['jquery', 'text!./templates/l2U.html', 'text!./templates/l3W.html', 'kendo'], 
	function($, l2U, l3W){
		'use strict';
	
	
	function getJLayout (type){
		var layoutHtml;
		switch (type){
			case "2U":  layoutHtml = $(l2U); //
									break;
			case "3W":  layoutHtml = $(l3W); //
									break;
			default:    layoutHtml = $(l3W);
		}
		return $(layoutHtml);
	}

	function createLayout (type, selector){ //for now its "3W", "#container"
		var jLayout = getJLayout(type); //will return l3W.html
		var container = $(selector); //"#container"
		container.css({
			width: "100%",
			height: "100%"
		});
		jLayout.appendTo(selector);
		
		//the craetion of kendo from libery vendours of kendoSplitter
		jLayout.kendoSplitter({
		panes: [
               { collapsible: true, size: "250px" },//123
               { collapsible: false },//4
               { collapsible: true, size: "220px"}//,resizable: true }//5
                ]}); 
	}

	return {
		createLayout: createLayout
	}
});