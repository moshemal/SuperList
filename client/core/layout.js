define(['jquery', 'text!./templates/l3W.html','modules/left/List/List' ,'modules/middle/TabStripMid' ,'kendo'], 
	function($, l3W, leftLst,midView){
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
		leftLst.createListView($("#left-pane")); //left side list view		
		midView.createMiddle($("#center-pane"));//middle side tab strip 
		
		
		leftLst.addFunctionForChanges(midView.openNewTab);
		 midView.addFunctionForChanges(leftLst.getAllListsView);
		
		
	
				jLayout.kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: true, size: "30%", max: "30%" },
                { collapsible: false },
                { collapsible: true, size: "40%", max: "40%" }
            ]
        });

				
	}

	return {
		createLayout: createLayout
	}
});