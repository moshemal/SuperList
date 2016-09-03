define(['jquery', 'text!./templates/l3W.html','modules/List/List', 'modules/View/View', 'modules/Item/Item', 'kendo'],
	function($,  l3W, list, view, item){
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

	function createLayout(type, selector){
		var jLayout = getJLayout(type);
		var container = $(selector);
		container.css({
			width: "100%",
			height: "100%"
		});
		jLayout.appendTo(selector);
        list.createListView($("#left-pane"));
        view.createMiddleView($("#center-pane"));
        item.createRightView($("#right-pane"));

        list.addFunctionForChanges(view.openNewTab);
        list.addFunctionForChanges(item.emptyRightSide);
        view.addFunctionForChanges(list.getListView);
        view.addFunctionForOpenItem(item.openItem);
        item.addFunctionForChanges(list.getListView);
        item.addFunctionForChanges(view.openNewTab);

        jLayout.kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: true, size: "30%", max: "30%" },
                { collapsible: false },
                { collapsible: true, size: "25%", max: "30%" }
            ]
        });
		
		
		$("#left-pane").kendoSplitter({
			orientation: "vertical",
			panes: [
                            { collapsible: true,size:"90px",resizable:true },//top 1
                            { collapsible: false, size: "470",resizable:true  },//middle 2
                            { collapsible: false, resizable: true, size: "20px" } //buttom 3 button
                        ]
			
		});
		
	}

	return {
		createLayout: createLayout
    }
});